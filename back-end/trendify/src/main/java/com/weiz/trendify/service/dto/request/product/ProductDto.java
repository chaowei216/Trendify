package com.weiz.trendify.service.dto.request.product;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {

    Long id;
    @NotBlank(message = "id must be empty")
    String name;
    Double price;
    String defaultImage;
}
