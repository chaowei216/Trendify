package com.weiz.trendify.service.dto.response.order;

import com.weiz.trendify.entity.enums.ESize;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemDto {

    Long id;

    Integer numOfItems;

    String imageName;

    String name;

    ESize size;

    String color;

    Double totalPrice;
}
