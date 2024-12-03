package com.weiz.trendify.integration.minio;

import com.google.common.net.HttpHeaders;
import com.weiz.trendify.common.utils.ConverterUtils;
import com.weiz.trendify.exception.BadRequestException;
import io.minio.*;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MinioChannel {

    final static String BUCKET_NAME = "resources";
    final MinioClient minioClient;

    @PostConstruct
    private void init() {
        createBucket(BUCKET_NAME);
    }

    @SneakyThrows
    public void createBucket(final String bucketName) {

        // check if bucket has already existed
        final var found = minioClient.bucketExists(
                BucketExistsArgs.builder()
                        .bucket(bucketName)
                        .build()
        );

        if (!found) {
            // create if not exist
            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(bucketName)
                            .build()
            );

            // set bucket to public by setting policy
            final var policy = """
                        {
                          "Version": "2012-10-17",
                          "Statement": [
                           {
                              "Effect": "Allow",
                              "Principal": "*",
                              "Action": "s3:GetObject",
                              "Resource": "arn:aws:s3:::%s/*"
                            }
                          ]
                        }
                    """.formatted(bucketName);
            minioClient.setBucketPolicy(
                    SetBucketPolicyArgs.builder().bucket(bucketName).config(policy).build()
            );
        } else {
            log.info("Bucket %s đã tồn tại.".formatted(bucketName));
        }
    }

    @SneakyThrows
    public String upload(final MultipartFile file) {
        log.info("Bucket: {}, file size: {}", BUCKET_NAME, file.getSize());
        final var fileName = file.getOriginalFilename();

        try {
            minioClient.putObject(
              PutObjectArgs.builder()
                      .bucket(BUCKET_NAME)
                      .object(fileName)
                      .contentType(Objects.isNull(file.getContentType()) ? "image/png; image/jpg" : file.getContentType())
                      .stream(file.getInputStream(), file.getSize(), -1)
                      .build()
            );
        } catch (Exception ex) {
            log.error("Error saving file \n {} ", ex.getMessage());
            throw new BadRequestException("Unable to upload file", ex);
        }

        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(BUCKET_NAME)
                        .object(fileName)
                        .build()
        );
    }

    public byte[] download(String bucket, String name) {
        try (GetObjectResponse inputStream = minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucket)
                .object(name)
                .build())) {
            String contentLength = inputStream.headers().get(HttpHeaders.CONTENT_LENGTH);
            int size = StringUtils.isEmpty(contentLength) ? 0 : Integer.parseInt(contentLength);
            return ConverterUtils.readBytesFromInputStream(inputStream, size);
        } catch (Exception e) {
            throw new BadRequestException("Unable to download file", e);
        }
    }
}
