package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantDto {

    Long id;
    ESize size;
    String color;
    Integer quantity;
    String imageName;
}
