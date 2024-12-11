package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.auth.LoginRequest;
import com.weiz.trendify.service.dto.request.auth.RegisterRequest;
import com.weiz.trendify.service.dto.request.auth.TokenRequest;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);

    TokenResponse refreshToken(TokenRequest request);
}
