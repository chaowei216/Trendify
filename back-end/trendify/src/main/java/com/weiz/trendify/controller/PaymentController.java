package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.order.OrderCreateDto;
import com.weiz.trendify.service.dto.request.payment.ResultStatusDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.payment.PaymentUrlResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/payment")
@Tag(name = "payment-controller")
public interface PaymentController {

    @Operation(summary = "Create payment request")
    @Secured("ROLE_CUSTOMER")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    Response<PaymentUrlResponse> createPaymentRequest(@RequestBody final OrderCreateDto request);

    @Operation(summary = "Handle response request")
    @Secured("ROLE_CUSTOMER")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/response")
    Response<Void> handleResponseRequest(@RequestBody final ResultStatusDto response);
}
