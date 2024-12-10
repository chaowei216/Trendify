package com.weiz.trendify.service;

import com.weiz.trendify.entity.Order;
import jakarta.validation.constraints.NotNull;

public interface VnPayService {

    String createPaymentUrl(@NotNull final Order order);
}
