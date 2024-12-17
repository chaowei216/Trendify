package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.auth.*;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

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
    @PatchMapping("/confirm-email")
    Response<Void> confirmEmail(@Valid @RequestBody ConfirmEmailRequest request);

    @Operation(summary = "Forgot password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/forgot-password")
    Response<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request);

    @Operation(summary = "Reset password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/reset-password")
    Response<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request);

    @Operation(summary = "Change password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/change-password")
    Response<Void> changePassword(@Valid @RequestBody ChangePasswordRecord request);

    @Operation(summary = "Logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout/{id}")
    Response<Void> logout(@NotNull @PathVariable(name = "id") Long id);
}
