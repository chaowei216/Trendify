package com.weiz.trendify.service.dto.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

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
    String description;
    List<ProductVariantDto> variants = new ArrayList<>();
}
