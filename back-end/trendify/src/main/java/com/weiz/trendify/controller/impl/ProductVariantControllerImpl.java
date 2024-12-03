package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.ProductVariantController;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductVariantControllerImpl implements ProductVariantController {

    private final ProductVariantService productVariantService;

    @Override
    public Response<ProductVariantDto> createProduct(ProductVariantCreateDto dto) {
        log.info("Product variant service: Create product variant request");
        return Response.created(productVariantService.create(dto));
    }

    @Override
    public Response<ProductVariantDto> updateProductVariant(@NotNull Long id, ProductVariantCreateDto dto) {
        log.info("Product variant service: update product request");
        return Response.created(productVariantService.create(dto));
    }

    @Override
    public Response<Void> deleteProductVariant(@NotNull Long id) {
        log.info("Product variant service: delete product request");
        return null;
    }
}
