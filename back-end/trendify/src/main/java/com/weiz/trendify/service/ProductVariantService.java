package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import org.springframework.lang.NonNull;

public interface ProductVariantService {

    ProductVariantDto create(@NonNull final ProductVariantCreateDto createDto);

    ProductVariantDto update(@NonNull final ProductVariantUpdateDto updateDto);

    void delete(@NonNull final Long id);
}
