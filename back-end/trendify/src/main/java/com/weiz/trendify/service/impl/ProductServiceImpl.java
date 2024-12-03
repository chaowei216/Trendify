package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.enums.ProductStatus;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.integration.minio.MinioChannel;
import com.weiz.trendify.repository.ProductRepository;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.mapper.product.ProductCreateMapper;
import com.weiz.trendify.service.mapper.product.ProductDetailMapper;
import com.weiz.trendify.service.mapper.product.ProductMapper;
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
    private final ProductCreateMapper productCreateMapper;
    private final MinioChannel minioChannel;
    private final CategoryService categoryService;

    @Override
    public ProductDetailDto getProduct(@NonNull final Long productId) {
        log.info("Product Service: get product with id: {}", productId);
        return productRepository.findById(productId)
                .map(productDetailMapper::toDto)
                .orElse(null);
    }

    @Override
    public Page<ProductDto> getAllProducts(ProductSearchRequest request) {
        log.info("Product Service: get all products");
        return productRepository.findAll(request.specification(), request.getPaging().pageable())
                .map(productMapper::toDto);
    }

    @Override
    public ProductDetailDto createProduct(@NonNull final ProductCreateDto productDto) {
        log.info("Product Service: check category");
        final Category cate = categoryService.getCategory(productDto.getCategoryId());

        if (cate == null) {
            throw new NotFoundException("Category not found");
        }

        log.info("Product Service: map dto request to entity");
        final Product product = productCreateMapper.toEntity(productDto);
        product.setStatus(ProductStatus.AVAILABLE);
        product.setCategory(cate);

        log.info("Product Service: upload image");
        product.setDefaultImage(minioChannel.upload(productDto.getImageFile()));

        log.info("Product Service: save product");
        productRepository.save(product);
        return null;
    }

    @Override
    public ProductDto updateProduct(@NonNull final ProductDto productDto) {
        return null;
    }

    @Override
    public void deleteProduct(@NonNull final Long productId) {
        log.info("Product Service: find product with id: {}", productId);
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product with id: " + productId + " not found"));

        log.info("Product Service: delete product with id: {}", productId);
        product.setStatus(ProductStatus.UNAVAILABLE);
        productRepository.save(product);
    }
}
