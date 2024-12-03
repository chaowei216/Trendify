package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
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
    Response<ProductVariantDto> updateProductVariant(@NonNull @PathVariable(name = "id") final Long id,
                                       final ProductVariantCreateDto dto);

    @Operation(summary = "Delete product variant")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    Response<Void> deleteProductVariant(@NonNull @PathVariable(name = "id") final Long id);
}
