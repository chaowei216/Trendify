package com.weiz.trendify.service.impl;

import com.weiz.trendify.repository.ProductRepository;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
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

    @Override
    public ProductDto getProduct(@NonNull final Long productId) {
        return null;
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

    }
}
