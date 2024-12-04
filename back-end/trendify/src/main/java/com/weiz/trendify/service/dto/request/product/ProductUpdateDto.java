package com.weiz.trendify.service.dto.request.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdateDto {

    @NotNull
    Long id;

    @NotBlank(message = "name must not be empty")
    String name;

    @NotNull
    @DecimalMin(value = "0", message = "price must be greater than or equal to 0")
    Double price;

    @NotBlank
    String description;
}
