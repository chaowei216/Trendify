package com.weiz.trendify.service.dto.request.auth;


import jakarta.validation.constraints.NotNull;

public record ConfirmEmailRequest(@NotNull String email, @NotNull String token) {
}
