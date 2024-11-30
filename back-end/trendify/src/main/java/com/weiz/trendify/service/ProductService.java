package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.product.ProductDto;
import org.springframework.lang.NonNull;

import java.util.List;

public interface ProductService {

    ProductDto getProduct(@NonNull final Long productId);

    List<ProductDto> getAllProducts();

    ProductDto createProduct(@NonNull final ProductDto productDto);

    ProductDto updateProduct(@NonNull final ProductDto productDto);

    void deleteProduct(@NonNull final Long productId);
}