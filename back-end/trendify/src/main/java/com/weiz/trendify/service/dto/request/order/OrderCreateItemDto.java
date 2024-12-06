package com.weiz.trendify.service.dto.request.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreateItemDto {

    Long variantId;

    Integer quantity;

    Double totalPrice;
}
