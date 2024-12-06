package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.entity.enums.OrderStatus;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.service.*;
import com.weiz.trendify.service.dto.request.order.OrderCreateDto;
import com.weiz.trendify.service.dto.request.order.OrderUpdateDto;
import com.weiz.trendify.service.dto.request.payment.ResultStatusDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.response.payment.PaymentUrlResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentServiceImpl implements PaymentService {

    OrderService orderService;
    VnPayService vnPayService;
    ProductVariantService productVariantService;

    @Override
    public PaymentUrlResponse createPaymentUrl(@NotNull OrderCreateDto dto) {
        log.info("Payment Service [CREATE]: create payment url processing...");

        // create order
        Order order = orderService.createOrder(dto);

        // create url
        String url = vnPayService.createPaymentUrl(order);
        return PaymentUrlResponse.builder()
                .paymentUrl(url)
                .build();
    }

    @Override
    public void handlePaymentResponse(@NotNull ResultStatusDto response) {
        log.info("Payment Service [UPDATE]: handle payment response processing...");

        // check order
        var order = orderService.getOrder(response.getOrderId());

        if (order == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Order not found");
        }

        log.info("Payment Service [UPDATE]: update order status");
        // case EXIST - update
        if (response.isSuccess()) {
            // case SUCCESS - update status to PROCESSING & minus item in store
            orderService.updateOrder(OrderUpdateDto.builder()
                    .id(order.getId())
                    .address(order.getAddress())
                    .phoneNumber(order.getPhoneNumber())
                    .status(OrderStatus.PROCESSING)
                    .build());

            // manage num of items
            order.getOrderDetails().forEach(orderDetail -> {
                int remainAmount = Math.max((orderDetail.getProductVariant().getQuantity() - orderDetail.getNumOfItems()), 0);
                productVariantService.update(ProductVariantUpdateDto.builder()
                        .id(orderDetail.getProductVariant().getId())
                        .quantity(remainAmount)
                        .build());
            });
        } else {
            // case FAIL - update status to CANCELLED
            orderService.updateOrder(OrderUpdateDto.builder()
                    .id(order.getId())
                    .address(order.getAddress())
                    .phoneNumber(order.getPhoneNumber())
                    .status(OrderStatus.CANCELED)
                    .build());
        }
    }
}
