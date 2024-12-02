package com.weiz.trendify.service.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailDto {

    Long id;
    String name;
    Double price;
    List<ProductVariantDto> variants = new ArrayList<>();
}
