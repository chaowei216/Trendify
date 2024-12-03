package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.enums.ESize;
import com.weiz.trendify.validation.ValidEnum;
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
public class ProductVariantCreateDto {

    ESize size;

    @NotBlank
    String color;

    @NonNull
    Integer quantity;

    @NotNull
    MultipartFile imageFile;

    @NonNull
    Long productId;
}