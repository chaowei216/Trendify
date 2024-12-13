package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.auth.*;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping("/api/v1/auth")
@Tag(name = "auth-controller")
public interface AuthController {

    @Operation(summary = "Login")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    Response<LoginResponse> login(@Valid @RequestBody LoginRequest request);

    @Operation(summary = "Register")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    Response<RegisterResponse> register(@Valid @RequestBody RegisterRequest request);

    @Operation(summary = "Refresh token")
    @Secured({"ROLE_ADMIN", "ROLE_STAFF", "ROLE_CUSTOMER"})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/refresh-token")
    Response<TokenResponse> refreshToken(@Valid @RequestBody TokenRequest request);

    @Operation(summary = "Verify email")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/verify-email")
    Response<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequest request);

    @Operation(summary = "Confirm email")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/confirm-email")
    Response<Void> confirmEmail(@Valid @RequestBody ConfirmEmailRequest request);
}
