package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.PaymentController;
import com.weiz.trendify.service.PaymentService;
import com.weiz.trendify.service.dto.request.order.OrderCreateDto;
import com.weiz.trendify.service.dto.request.payment.ResultStatusDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.payment.PaymentUrlResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaymentControllerImpl implements PaymentController {

    PaymentService paymentService;

    @Override
    public Response<PaymentUrlResponse> createPaymentRequest(OrderCreateDto request) {
        log.info("Payment Controller: create payment url request...");
        return Response.created(paymentService.createPaymentUrl(request));
    }

    @Override
    public Response<Void> handleResponseRequest(ResultStatusDto response) {
        log.info("Payment Controller: handle payment response request...");
        paymentService.handlePaymentResponse(response);
        return Response.noContent();
    }
}
