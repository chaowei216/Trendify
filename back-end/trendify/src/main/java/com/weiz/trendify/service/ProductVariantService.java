package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.request.product.VariantUpdateImageDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

public interface ProductVariantService {

    ProductVariantDto create(@NonNull final ProductVariantCreateDto createDto);

    ProductVariantDto update(@NonNull final ProductVariantUpdateDto updateDto);

    void updateImageVariant(@NonNull final VariantUpdateImageDto dto);

    void delete(@NonNull final Long id);
}
