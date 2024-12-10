package com.weiz.trendify.service.dto.request.auth;

import com.weiz.trendify.validation.date.ValidBirth;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotNull
    @Email
    String email;

    @NotNull
    String fullName;

    @NotNull
    String userName;

    @NotNull
    String password;

    @ValidBirth
    Instant dateOfBirth;

    @NotNull
    @Min(10)
    String phoneNumber;

    @NotNull
    String address;
}
