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
import jakarta.transaction.Transactional;
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

        log.info("Product Service [GET]: get product with id: {} processing...", productId);

        // find product by id
        return productRepository.findById(productId)
                .map(productDetailMapper::toDto)
                .orElse(null);
    }

    @Override
    public Page<ProductDto> getAllProducts(ProductSearchRequest request) {

        log.info("Product Service [GET ALL]: get all products processing...");

        // get all product
        return productRepository.findAll(request.specification(), request.getPaging().pageable())
                .map(productMapper::toDto);
    }

    @Override
    @Transactional
    public ProductDetailDto createProduct(@NonNull final ProductCreateDto productDto) {
        log.info("Product Service [CREATE]: Create product processing...");
        final Category cate = categoryService.getCategory(productDto.getCategoryId());

        if (cate == null) {
            throw new NotFoundException("Category not found");
        }

        // map dto to entity
        final Product product = productCreateMapper.toEntity(productDto);

        // set default status
        product.setStatus(ProductStatus.AVAILABLE);
        // set category
        product.setCategory(cate);

        log.info("Product Service: upload image");
        product.setDefaultImage(minioChannel.upload(productDto.getImageFile()));

        log.info("Product Service: save product");
        productRepository.save(product);
        return productDetailMapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(@NonNull final ProductDto productDto) {
        return null;
    }

    @Override
    public void deleteProduct(@NonNull final Long productId) {

        log.info("Product Service [DELETE]: Delete product processing...");

        // find product by id
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product with id: " + productId + " not found"));

        log.info("Product Service [DELETE]: delete product with id: {}", productId);
        product.setStatus(ProductStatus.UNAVAILABLE);
        productRepository.save(product);
    }

    @Override
    public Product getProductById(@NonNull Long productId) {
        log.info("Product Service [GET]: find product: {}", productId);
        return productRepository.findById(productId).orElse(null);
    }
}
