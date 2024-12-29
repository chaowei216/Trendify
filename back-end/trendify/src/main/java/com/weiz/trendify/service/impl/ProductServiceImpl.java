package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.entity.enums.ProductStatus;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.integration.minio.MinioChannel;
import com.weiz.trendify.repository.ProductRepository;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductImageUpdateDto;
import com.weiz.trendify.service.dto.request.product.ProductUpdateDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.mapper.product.ProductCreateMapper;
import com.weiz.trendify.service.mapper.product.ProductDetailMapper;
import com.weiz.trendify.service.mapper.product.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

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
        var product = productRepository.findById(productId)
                .orElse(null);

        if (product == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Product not found");
        }

        // case EXIST - return result
        return productDetailMapper.toDto(product);
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

        log.info("Product Service [CREATE]: upload image");
        product.setDefaultImage(minioChannel.upload(productDto.getImageFile()));

        log.info("Product Service [CREATE]: save product");
        productRepository.save(product);
        return productDetailMapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(@NonNull final ProductUpdateDto dto) {
        log.info("Product Service [UPDATE]: update product processing...");

        // check if product exists
        Product product = productRepository.findById(dto.getId()).orElse(null);

        // case: NOT EXIST - throw error
        if (product == null) {
            throw new NotFoundException("Product Not Found");
        }

        // case: EXIST - update
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());

        log.info("Product Service [UPDATE]: save product");
        productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    public void updateImage(@NotNull ProductImageUpdateDto dto) {
        log.info("Product Service [UPDATE IMAGE]: update product image processing...");

        // check if product exists
        Product product = productRepository.findById(dto.getId()).orElse(null);

        // case: NOT EXIST - throw error
        if (product == null) {
            throw new NotFoundException("Product Not Found");
        }

        log.info("Product Service [UPDATE IMAGE]: upload image");
        product.setDefaultImage(minioChannel.upload(dto.getImageFile()));

        // save (CREATE or UPDATE)
        log.info("Product Service [UPDATE IMAGE]: save product");
        productRepository.save(product);
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

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
}
