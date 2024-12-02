package com.weiz.trendify.service;

import com.weiz.trendify.service.dto.request.product.ProductDetailDto;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

import java.util.List;

public interface ProductService {

    ProductDetailDto getProduct(@NonNull final Long productId);

    Page<ProductDto> getAllProducts(final ProductSearchRequest request);

    ProductDto createProduct(@NonNull final ProductDto productDto);

    ProductDto updateProduct(@NonNull final ProductDto productDto);

    void deleteProduct(@NonNull final Long productId);
}