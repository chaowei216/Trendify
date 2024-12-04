package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantCreateDto {

    ESize size;

    @NotBlank
    String color;

    @NonNull
    @Min(value = 0, message = "quantity must be greater than or equal to 0")
    Integer quantity;

    @NotNull
    MultipartFile imageFile;

    @NonNull
    Long productId;
}