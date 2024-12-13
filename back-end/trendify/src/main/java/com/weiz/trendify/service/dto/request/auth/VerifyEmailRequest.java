package com.weiz.trendify.service.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record VerifyEmailRequest(@NotNull @Email String email) {
}
