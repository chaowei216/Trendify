package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.entity.enums.ProductStatus;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.integration.minio.MinioChannel;
import com.weiz.trendify.repository.ProductVariantRepository;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import com.weiz.trendify.service.mapper.product.ProductVariantCreateMapper;
import com.weiz.trendify.service.mapper.product.ProductVariantMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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
    public ProductVariantDto create(ProductVariantCreateDto createDto) {
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
    public ProductVariantDto update(ProductVariantCreateDto updateDto) {
        return null;
    }
}
