package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreateDto {

    @NotBlank(message = "name must not be empty")
    String name;

    @NotNull
    Double price;

    @NotBlank
    String description;

    MultipartFile imageFile;

    @NotNull
    Integer categoryId;
}
