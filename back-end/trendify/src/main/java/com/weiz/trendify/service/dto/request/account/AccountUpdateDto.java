package com.weiz.trendify.service.dto.request.account;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateDto {

    @NotNull
    Long id;

    @NotNull
    String fullName;

    @NotNull
    String phoneNumber;

    @NotNull
    String address;
}
