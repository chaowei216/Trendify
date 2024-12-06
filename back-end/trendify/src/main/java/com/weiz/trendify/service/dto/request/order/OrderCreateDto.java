package com.weiz.trendify.service.dto.request.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreateDto {

    @NotNull
    Long userId;

    List<OrderCreateItemDto> items = new ArrayList<>();

    String note;

    @NotNull
    Double totalPrice;

    @NotNull
    @NotBlank
    String paymentMethod;
}
