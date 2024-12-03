package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/products")
@Tag(name = "product-controller")
public interface ProductController {

    @Operation(summary = "Get all products")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/search")
    Response<PagingResponse<ProductDto>> getProducts(@RequestBody final ProductSearchRequest request);

    @Operation(summary = "Get product")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    Response<ProductDetailDto> getProduct(@NonNull @PathVariable(name = "id") final Long id);

    @Operation(summary = "Create product")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<ProductDetailDto> createProduct(@Valid final ProductCreateDto dto);

    @Operation(summary = "Update product")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    Response<ProductDto> updateProduct(@NonNull @PathVariable(name = "id") final Long id,
                                       @RequestBody final ProductDto dto);

    @Operation(summary = "Delete product")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    Response<Void> deleteProduct(@NonNull @PathVariable(name = "id") final Long id);
}
