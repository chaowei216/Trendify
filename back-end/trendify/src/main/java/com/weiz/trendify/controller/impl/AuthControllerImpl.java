package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.AuthController;
import com.weiz.trendify.service.AuthService;
import com.weiz.trendify.service.dto.request.auth.*;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthControllerImpl implements AuthController {

    AuthService authService;

    @Override
    public Response<LoginResponse> login(LoginRequest request) {
        return Response.ok(authService.login(request));
    }

    @Override
    public Response<RegisterResponse> register(RegisterRequest request) {
        return Response.created(
                authService.register(request)
        );
    }

    @Override
    public Response<TokenResponse> refreshToken(@Valid TokenRequest request) {
        return Response.created(
                authService.refreshToken(request)
        );
    }

    @Override
    public Response<Void> verifyEmail(VerifyEmailRequest request) {
        authService.sendVerifyEmail(request);
        return Response.noContent();
    }

    @Override
    public Response<Void> confirmEmail(ConfirmEmailRequest request) {
        authService.confirmEmail(request);
        return Response.noContent();
    }
}
