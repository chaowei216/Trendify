package com.weiz.trendify.service.dto.request.account;

import com.weiz.trendify.validation.date.ValidBirth;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffAccountRequest {

    @NotNull
    String fullName;

    @NotNull
    String userName;

    @NotNull
    @ValidBirth
    Instant dateOfBirth;

    @NotNull
    @Email
    String email;

    @NotNull
    @Length(min = 10, max = 10)
    String phoneNumber;

    @NotNull
    String address;
}
