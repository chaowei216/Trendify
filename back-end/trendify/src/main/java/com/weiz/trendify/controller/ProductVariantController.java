package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.request.product.VariantUpdateImageDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/variants")
@Tag(name = "product-variant-controller")
public interface ProductVariantController {

    @Operation(summary = "Create product variant")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<ProductVariantDto> createProduct(@Valid final ProductVariantCreateDto dto);

    @Operation(summary = "Update product variant")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping(value ="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<ProductVariantDto> updateProductVariant(@NotNull @PathVariable(name = "id") final Long id,
                                                     @Valid final ProductVariantUpdateDto dto);

    @Operation(summary = "Update product variant image")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping(value ="/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<ProductVariantDto> updateImage(@NotNull @PathVariable(name = "id") final Long id,
                                            @Valid final VariantUpdateImageDto dto);

    @Operation(summary = "Delete product variant")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    Response<Void> deleteProductVariant(@NotNull @PathVariable(name = "id") final Long id);
}
