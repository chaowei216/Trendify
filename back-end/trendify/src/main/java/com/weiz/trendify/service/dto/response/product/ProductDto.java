package com.weiz.trendify.service.dto.response.product;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {

    Long id;

    @NotBlank(message = "name must not be empty")

    String name;

    Double price;

    String description;

    String defaultImage;
}
