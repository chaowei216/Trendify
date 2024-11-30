package com.weiz.trendify.service.impl;

import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Override
    public ProductDto getProduct(@NonNull final Long productId) {
        return null;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return List.of();
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
