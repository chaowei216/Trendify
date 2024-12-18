package com.weiz.trendify.service.dto.request.auth;

import jakarta.validation.constraints.NotNull;

public record ResetPasswordRequest(@NotNull String email, @NotNull String newPassword, @NotNull String token) {
}
