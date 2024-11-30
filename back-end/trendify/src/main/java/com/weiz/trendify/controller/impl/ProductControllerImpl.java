package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.ProductController;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import com.weiz.trendify.service.dto.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductControllerImpl implements ProductController {

    private final ProductService productService;

    @Override
    public Response<ProductDto> getProducts() {
        log.info("Product service: Get all products request");

        return Response.ok(new ProductDto());
    }

    @Override
    public Response<ProductDto> getProduct(@NonNull final Long id) {
        return null;
    }

    @Override
    public Response<ProductDto> createProduct(ProductDto dto) {
        return null;
    }

    @Override
    public Response<ProductDto> updateProduct(Long id, ProductDto dto) {
        return null;
    }

    @Override
    public Response<Void> deleteProduct(Long id) {
        return null;
    }
}
