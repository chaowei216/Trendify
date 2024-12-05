package com.weiz.trendify.service.impl;

import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.OrderRepository;
import com.weiz.trendify.service.OrderService;
import com.weiz.trendify.service.dto.request.order.OrderSearchRequest;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import com.weiz.trendify.service.mapper.order.OrderDetailMapper;
import com.weiz.trendify.service.mapper.order.OrderMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {

    final OrderRepository orderRepository;
    final OrderDetailMapper orderDetailMapper;
    final OrderMapper orderMapper;

    @Override
    public OrderDetailDto getOrderDetail(@NotNull Long orderId) {

        log.info("Order Service [GET]: get order detail with id: {} processing...", orderId);

        // find order by id
        var order = orderRepository.findById(orderId)
                .orElse(null);

        if (order == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Order not found");
        }

        // case EXIST - return result
        return orderDetailMapper.toDto(order);
    }

    @Override
    public Page<OrderDto> getAllOrders(@NotNull OrderSearchRequest request) {

        log.info("Order Service [GET ALL]: get all orders processing...");

        // get all orders
        return orderRepository.findAll(request.specification(), request.getPaging().pageable())
                .map(orderMapper::toDto);
    }
}
