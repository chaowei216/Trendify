package com.weiz.trendify.service.dto.response.order;

import com.weiz.trendify.entity.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDto {

    Long id;

    String address;

    Date orderDate;

    Double totalPrice;

    OrderStatus status;
}
