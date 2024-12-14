package com.weiz.trendify.service;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Order;
import org.springframework.lang.NonNull;

public interface EmailService {

    void sendConfirmOrderEmail(@NonNull Order order);

    void sendTokenVerificationEmail(@NonNull Account account, @NonNull String token);
}
