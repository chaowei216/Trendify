package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.ProductVariantController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.request.product.VariantUpdateImageDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductVariantControllerImpl implements ProductVariantController {

    private final ProductVariantService productVariantService;

    @Override
    public Response<ProductVariantDto> createProduct(ProductVariantCreateDto dto) {
        log.info("Product Variant Controller: Create variant request...");
        return Response.created(productVariantService.create(dto));
    }

    @Override
    public Response<ProductVariantDto> updateProductVariant(Long id, ProductVariantUpdateDto dto) {
        log.info("Product Variant Controller: update variant request...");

        if (!Objects.equals(id, dto.getId())) {
            throw new BadRequestException("Product variant id mismatch");
        }

        return Response.ok(productVariantService.update(dto));
    }


    @Override
    public Response<Void> updateImage(Long id, VariantUpdateImageDto dto) {
        log.info("Product Variant Controller: update variant image request...");

        if (!Objects.equals(id, dto.getId())) {
            throw new BadRequestException("Product variant id mismatch");
        }

        // update
        productVariantService.updateImageVariant(dto);

        return Response.noContent();
    }

    @Override
    public Response<Void> deleteProductVariant(Long id) {
        log.info("Product Variant Controller: delete variant request...");
        productVariantService.delete(id);
        return Response.noContent();
    }
}
