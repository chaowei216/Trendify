package com.weiz.trendify.service.dto.request.category;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryUpdateDto {

    @NotNull
    Integer id;

    @NotNull
    String name;
}
