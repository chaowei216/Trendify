package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.auth.*;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;
import org.springframework.lang.NonNull;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);

    TokenResponse refreshToken(TokenRequest request);

    void sendVerifyEmail(@NonNull VerifyEmailRequest request);

    void confirmEmail(@NonNull ConfirmEmailRequest request);
}
