package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductImageUpdateDto;
import com.weiz.trendify.service.dto.request.product.ProductUpdateDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/products")
@Tag(name = "product-controller")
public interface ProductController {

    @Operation(summary = "Get all products")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/search")
    Response<PagingResponse<ProductDto>> getProducts(@RequestBody final ProductSearchRequest request);

    @Operation(summary = "Get product")
    @Secured({"ROLE_ADMIN", "ROLE_STAFF", "ROLE_CUSTOMER"})
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    Response<ProductDetailDto> getProduct(@NotNull @PathVariable(name = "id") final Long id);

    @Operation(summary = "Create product")
    @Secured("ROLE_STAFF")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<ProductDetailDto> createProduct(@Valid final ProductCreateDto dto);

    @Operation(summary = "Update product")
    @Secured("ROLE_STAFF")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    Response<ProductDto> updateProduct(@NotNull @PathVariable(name = "id") final Long id,
                                       @Valid final @RequestBody ProductUpdateDto dto);

    @Operation(summary = "Update product image")
    @Secured("ROLE_STAFF")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<Void> updateImage(@NotNull @PathVariable(name = "id") final Long id,
                                       @Valid final ProductImageUpdateDto dto);

    @Operation(summary = "Delete product")
    @Secured("ROLE_STAFF")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    Response<Void> deleteProduct(@NotNull @PathVariable(name = "id") final Long id);
}
