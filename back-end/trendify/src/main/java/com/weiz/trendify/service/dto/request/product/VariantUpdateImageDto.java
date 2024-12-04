package com.weiz.trendify.service.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VariantUpdateImageDto {

    @NonNull
    Long id;

    @NotNull
    MultipartFile imageFile;
}
