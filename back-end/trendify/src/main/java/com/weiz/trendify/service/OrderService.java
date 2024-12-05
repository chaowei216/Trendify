package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.order.OrderSearchRequest;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

public interface OrderService {

    OrderDetailDto getOrderDetail(@NonNull final Long orderId);

    Page<OrderDto> getAllOrders(@NonNull final OrderSearchRequest request);
}
