package com.weiz.trendify.service.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {

    Long id;
    String name;
    Double price;
    String defaultImage;

//    public static ProductDto from(Product product) {
//        return ProductDto.builder()
//    }
}
