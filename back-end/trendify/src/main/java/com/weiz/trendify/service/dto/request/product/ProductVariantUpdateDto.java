package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantUpdateDto {

    @NotNull
    Long id;

    @NotNull
    @Min(value = 0, message = "quantity must be greater than or equal to 0")
    Integer quantity;
}
