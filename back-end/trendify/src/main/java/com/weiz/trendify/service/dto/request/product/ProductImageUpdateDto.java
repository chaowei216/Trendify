package com.weiz.trendify.service.dto.request.product;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductImageUpdateDto {

    @NotNull
    Long id;

    @NotNull
    MultipartFile imageFile;
}
