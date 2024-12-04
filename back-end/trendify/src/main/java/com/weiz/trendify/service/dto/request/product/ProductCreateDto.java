package com.weiz.trendify.service.dto.request.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreateDto {

    @NotBlank(message = "name must not be empty")
    String name;

    @NotNull
    @DecimalMin(value = "0", message = "price must be greater than or equal to 0")
    Double price;

    @NotBlank
    String description;

    @NotNull
    MultipartFile imageFile;

    @NotNull
    Integer categoryId;
}
