package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.order.OrderCreateDto;
import com.weiz.trendify.service.dto.request.payment.ResultStatusDto;
import com.weiz.trendify.service.dto.response.payment.PaymentUrlResponse;
import org.springframework.lang.NonNull;

public interface PaymentService {

    PaymentUrlResponse createPaymentUrl(@NonNull final OrderCreateDto dto);

    void handlePaymentResponse(@NonNull final ResultStatusDto response);
}
