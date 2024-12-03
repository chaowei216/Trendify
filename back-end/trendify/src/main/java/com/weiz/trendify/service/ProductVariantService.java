package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;

public interface ProductVariantService {

    ProductVariantDto create(ProductVariantCreateDto createDto);
    ProductVariantDto update(ProductVariantCreateDto updateDto);
}
