package com.weiz.trendify.service;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

public interface ProductService {

    ProductDetailDto getProduct(@NonNull final Long productId);

    Page<ProductDto> getAllProducts(final ProductSearchRequest request);

    ProductDetailDto createProduct(@NonNull final ProductCreateDto productDto);

    ProductDto updateProduct(@NonNull final ProductDto productDto);

    void deleteProduct(@NonNull final Long productId);

    Product getProductById(@NonNull final Long productId);
}