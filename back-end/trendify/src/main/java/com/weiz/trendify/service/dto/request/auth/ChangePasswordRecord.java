package com.weiz.trendify.service.dto.request.auth;

import jakarta.validation.constraints.NotNull;

public record ChangePasswordRecord(@NotNull Long accountId, @NotNull String oldPassword, @NotNull String newPassword) {
}
