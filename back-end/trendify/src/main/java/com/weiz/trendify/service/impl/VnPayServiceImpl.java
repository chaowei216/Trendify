package com.weiz.trendify.service.impl;

import com.weiz.trendify.config.properties.VnPayProperties;
import com.weiz.trendify.entity.Order;
import com.weiz.trendify.integration.vnpay.VnPayUtils;
import com.weiz.trendify.service.VnPayService;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VnPayServiceImpl implements VnPayService {

    VnPayProperties properties;

    @Override
    public String createPaymentUrl(@NotNull Order order) {
        Map<String, String> vnpParamsMap = properties.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(order.getTotalPrice().intValue() * 100L));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang tai Trendify");
        vnpParamsMap.put("vnp_IpAddr", "127.0.0.1");

        //build query url
        String queryUrl = VnPayUtils.getPaymentURL(vnpParamsMap, true);
        String hashData = VnPayUtils.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VnPayUtils.hmacSHA512(properties.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

        return properties.getUrl() + "?" + queryUrl;
    }
}
