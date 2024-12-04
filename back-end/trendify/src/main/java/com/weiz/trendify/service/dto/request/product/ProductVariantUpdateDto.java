package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantUpdateDto {

    ESize size;

    @NotBlank
    String color;

    @NonNull
    Integer quantity;

    @NotNull
    MultipartFile imageFile;
}
