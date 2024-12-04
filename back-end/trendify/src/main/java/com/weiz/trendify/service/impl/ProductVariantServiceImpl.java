package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.integration.minio.MinioChannel;
import com.weiz.trendify.repository.ProductVariantRepository;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import com.weiz.trendify.service.mapper.product.ProductVariantCreateMapper;
import com.weiz.trendify.service.mapper.product.ProductVariantMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantServiceImpl implements ProductVariantService {

    final ProductVariantRepository productVariantRepository;
    final ProductService productService;
    final ProductVariantCreateMapper productVariantCreateMapper;
    final MinioChannel minioChannel;
    final ProductVariantMapper productVariantMapper;

    @Override
    public ProductVariantDto create(@NotNull ProductVariantCreateDto createDto) {
        log.info("Product Variant Service: Check product");
        final var pro = productService.getProductById(createDto.getProductId());

        if (pro == null) {
            throw new NotFoundException("Product Not Found");
        }

        log.info("Product Variant Service: map dto request to entity");
        final ProductVariant product = productVariantCreateMapper.toEntity(createDto);
        product.setProduct(pro);

        log.info("Product Service: upload image");
        product.setImageName(minioChannel.upload(createDto.getImageFile()));

        log.info("Product Service: save product");
        productVariantRepository.save(product);
        return productVariantMapper.toDto(product);
    }

    @Override
    public ProductVariantDto update(@NotNull ProductVariantUpdateDto updateDto) {
        return null;
    }

    @Override
    public void delete(@NotNull Long id) {
        log.info("Product Variant Service: find product variant with id: {}", id);
        var variant = productVariantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product Variant with id: " + id + " not found"));

        log.info("Product Variant Service: delete product variant with id: {}", id);
        productVariantRepository.delete(variant);
    }
}
