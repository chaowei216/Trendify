package com.weiz.trendify.service.dto.request.payment;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultStatusDto {

    @NotNull
    Long orderId;

    @NotNull
    boolean isSuccess;
}
