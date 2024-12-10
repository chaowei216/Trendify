package com.weiz.trendify.service.dto.request.order;

import com.weiz.trendify.entity.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderUpdateDto {

    Long id;

    String phoneNumber;

    String address;

    OrderStatus status;
}
