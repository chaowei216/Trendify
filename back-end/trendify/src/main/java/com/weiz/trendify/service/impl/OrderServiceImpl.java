package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.entity.OrderDetail;
import com.weiz.trendify.entity.enums.OrderStatus;
import com.weiz.trendify.entity.enums.ProductStatus;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.OrderDetailRepository;
import com.weiz.trendify.repository.OrderRepository;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.OrderService;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.order.OrderCreateDto;
import com.weiz.trendify.service.dto.request.order.OrderCreateItemDto;
import com.weiz.trendify.service.dto.request.order.OrderSearchRequest;
import com.weiz.trendify.service.dto.request.order.OrderUpdateDto;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import com.weiz.trendify.service.mapper.order.OrderDetailMapper;
import com.weiz.trendify.service.mapper.order.OrderMapper;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {

    final OrderRepository orderRepository;
    final OrderDetailMapper orderDetailMapper;
    final OrderMapper orderMapper;
    final AccountService accountService;
    final OrderDetailRepository orderDetailRepository;
    final ProductVariantService productVariantService;
    final ProductService productService;

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

    @Override
    @Transactional
    public Order createOrder(@NotNull OrderCreateDto orderDto) {
        log.info("Order Service [CREATE]: create order processing...");

        // check user if exists
        var user = accountService.getAccountByEmail(orderDto.getEmail());

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        // create order
        Order order = Order.builder()
                .address(user.getAddress())
                .orderDate(Instant.now())
                .totalPrice(orderDto.getTotalPrice())
                .email(user.getEmail())
                .status(OrderStatus.PENDING) // Set status to PENDING
                .fullName(user.getFullName())
                .paymentMethod(orderDto.getPaymentMethod())
                .phoneNumber(user.getPhoneNumber())
                .note(orderDto.getNote())
                .account(user)
                .build();

        // save order to db
        orderRepository.save(order);

        // create details list
        List<OrderDetail> details = new ArrayList<>();

        // create order detail
        for (OrderCreateItemDto item: orderDto.getItems()) {
            // check variant
            var variant = productVariantService.getById(item.getVariantId());

            if (variant == null) {
                // case NOT EXIST - throw error
                throw new NotFoundException("Variant not found");
            }

            // check quantity
            if (variant.getQuantity() < item.getQuantity()) {
                throw new BadRequestException("Quantity is not enough");
            }

            // check product
            if (variant.getProduct().getStatus() == ProductStatus.UNAVAILABLE) {
                throw new BadRequestException("Product is not in stock");
            }

            // case EXIST - create a new order detail
            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .numOfItems(item.getQuantity())
                    .productVariant(variant)
                    .totalPrice(item.getTotalPrice())
                    .build();

            // save order detail to db
            orderDetailRepository.save(orderDetail);

            // add order detail to list
            details.add(orderDetail);
        }

        // add order details to order
        order.setOrderDetails(details);

        // save change
        orderRepository.save(order);

        // return created order
        return order;
    }

    @Override
    @Transactional
    public OrderDetailDto updateOrder(@NotNull OrderUpdateDto orderDto) {
        log.info("Order Service [UPDATE]: update order processing...");

        // check order
        Order order = orderRepository.findById(orderDto.getId()).orElse(null);

        if (order == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Order not found");
        }

        // case EXIST - update
        order.setPhoneNumber(orderDto.getPhoneNumber());
        order.setAddress(orderDto.getAddress());
        order.setStatus(orderDto.getStatus());

        // save to db
        orderRepository.save(order);

        //  return result
        return orderDetailMapper.toDto(order);
    }

    @Override
    public Order getOrder(@NotNull Long orderId) {
        log.info("Order Service [GET]: get order processing...");
        return orderRepository.findById(orderId).orElse(null);
    }
}
