package com.weiz.trendify.service.dto.response.order;

import com.weiz.trendify.entity.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailDto {

    Long id;

    String fullName;

    String email;

    String phoneNumber;

    String address;

    String note;

    Date orderDate;

    Double totalPrice;

    OrderStatus status;

    String paymentMethod;

    List<OrderItemDto> orderDetails = new ArrayList<>();
}
