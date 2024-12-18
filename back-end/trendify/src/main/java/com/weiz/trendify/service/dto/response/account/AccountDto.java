package com.weiz.trendify.service.dto.response.account;

import com.weiz.trendify.entity.enums.UserStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountDto {

    Long id;

    String fullName;

    String userName;

    Instant dateOfBirth;

    String email;

    String phoneNumber;

    String address;

    UserStatus status;
}
