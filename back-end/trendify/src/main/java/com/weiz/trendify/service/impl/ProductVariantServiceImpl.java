package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.integration.minio.MinioChannel;
import com.weiz.trendify.repository.ProductVariantRepository;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.ProductVariantService;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductVariantUpdateDto;
import com.weiz.trendify.service.dto.request.product.VariantUpdateImageDto;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import com.weiz.trendify.service.mapper.product.ProductVariantCreateMapper;
import com.weiz.trendify.service.mapper.product.ProductVariantMapper;
import jakarta.transaction.Transactional;
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
    @Transactional
    public ProductVariantDto create(@NotNull ProductVariantCreateDto createDto) {

        log.info("Product Variant Service [CREATE]: Create variant processing...");

        // check if product exists
        final var pro = productService.getProductById(createDto.getProductId());

        if (pro == null) {
            throw new NotFoundException("Product Not Found");
        }

        // check if variants exists (size, color, product)
        ProductVariant variant = productVariantRepository.findBySizeAndColorAndProduct(createDto.getSize(), createDto.getColor(), pro);

        if (variant != null) {

            // case: EXIST - update quantity
            variant.setQuantity(createDto.getQuantity() + variant.getQuantity());
        } else {

            // case: NOT EXIST - create new one
            variant = productVariantCreateMapper.toEntity(createDto);
            variant.setProduct(pro);
            variant.setColor(createDto.getColor().toUpperCase());
        }

        log.info("Product Variant Service [CREATE]: upload image");
        variant.setImageName(minioChannel.upload(createDto.getImageFile()));

        // save (CREATE or UPDATE)
        log.info("Product Variant Service [CREATE]: save product");
        productVariantRepository.save(variant);
        return productVariantMapper.toDto(variant);
    }

    @Override
    @Transactional
    public ProductVariantDto update(@NotNull ProductVariantUpdateDto updateDto) {
        log.info("Product Variant Service [UPDATE]: Update variant processing...");

        // check if variant exists
        ProductVariant variant = productVariantRepository.findById(updateDto.getId()).orElse(null);

        // case: NOT EXIST - throw error
        if (variant == null) {
            throw new NotFoundException("Product Variant Not Found");
        }

        // case: EXIST - update quantity
        variant.setQuantity(updateDto.getQuantity());

        // save (UPDATE)
        log.info("Product Variant Service [UPDATE]: save product");
        productVariantRepository.save(variant);
        return productVariantMapper.toDto(variant);
    }

    @Override
    public void updateImageVariant(@NotNull VariantUpdateImageDto dto) {
        log.info("Product Variant Service [UPDATE IMAGE]: Update variant image processing...");

        // check if variants exists
        ProductVariant variant = productVariantRepository.findById(dto.getId()).orElse(null);

        // case: NOT EXIST - throw error
        if (variant == null) {
            throw new NotFoundException("Product Variant Not Found");
        }

        // case: EXIST - update image
        log.info("Product Variant Service [UPDATE IMAGE]: upload image");
        variant.setImageName(minioChannel.upload(dto.getImageFile()));

        // save (CREATE or UPDATE)
        log.info("Product Variant Service [UPDATE IMAGE]: save product");
        productVariantRepository.save(variant);
    }

    @Override
    public void delete(@NotNull Long id) {
        log.info("Product Variant Service [DELETE]: Update variant processing...");

        // find variant by id
        var variant = productVariantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product Variant with id: " + id + " not found"));

        log.info("Product Variant Service [DELETE]: delete variant");
        productVariantRepository.delete(variant);
    }

    @Override
    public ProductVariant getById(@NotNull Long id) {
        log.info("Product Variant Service [GET]: Get variant with {} processing...", id);
        return productVariantRepository.findById(id).orElse(null);
    }
}
