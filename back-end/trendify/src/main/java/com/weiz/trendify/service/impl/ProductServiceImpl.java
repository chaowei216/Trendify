package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.enums.ProductStatus;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.ProductRepository;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductDetailDto;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.mapper.ProductDetailMapper;
import com.weiz.trendify.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductDetailMapper productDetailMapper;

    @Override
    public ProductDetailDto getProduct(@NonNull final Long productId) {
        return productRepository.findById(productId)
                .map(productDetailMapper::toDto)
                .orElse(null);
    }

    @Override
    public Page<ProductDto> getAllProducts(ProductSearchRequest request) {
        return productRepository.findAll(request.specification(), request.getPaging().pageable())
                .map(productMapper::toDto);
    }

    @Override
    public ProductDto createProduct(@NonNull final ProductDto productDto) {
        return null;
    }

    @Override
    public ProductDto updateProduct(@NonNull final ProductDto productDto) {
        return null;
    }

    @Override
    public void deleteProduct(@NonNull final Long productId) {
        log.info("Find product with id: {}", productId);
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product with id: " + productId + " not found"));

        log.info("Delete product with id: {}", productId);
        product.setStatus(ProductStatus.UNAVAILABLE);
        productRepository.save(product);
    }
}
