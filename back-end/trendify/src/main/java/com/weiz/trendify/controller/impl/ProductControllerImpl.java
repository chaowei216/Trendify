package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.ProductController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.PagingRequest;
import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductImageUpdateDto;
import com.weiz.trendify.service.dto.request.product.ProductUpdateDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PageableData;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductControllerImpl implements ProductController {

    private final ProductService productService;

    @Override
    public Response<PagingResponse<ProductDto>> getProducts(final ProductSearchRequest request) {
        log.info("Product Controller: get all products request...");
        final Page<ProductDto> products = productService.getAllProducts(request);
        final PagingRequest paging = request.getPaging();
        return Response.ok(
                new PagingResponse<ProductDto>()
                        .setContents(products.getContent())
                        .setPaging(
                                new PageableData()
                                        .setPageNumber(paging.getPage() - 1)
                                        .setTotalPage(products.getTotalPages())
                                        .setPageSize(paging.getSize())
                                        .setTotalRecord(products.getTotalElements())
                        )
        );
    }

    @Override
    public Response<ProductDetailDto> getProduct(Long id) {
        log.info("Product Controller: get product request...");
        return Response.ok(productService.getProduct(id));
    }

    @Override
    public Response<ProductDetailDto> createProduct(ProductCreateDto dto) {
        log.info("Product Controller: create product request...");
        return Response.created(productService.createProduct(dto));
    }

    @Override
    public Response<ProductDto> updateProduct(Long id, ProductUpdateDto dto) {
        log.info("Product Controller: update product request...");

        if (!Objects.equals(id, dto.getId())) {
            throw new BadRequestException("Product id mismatch");
        }

        return Response.ok(productService.updateProduct(dto));
    }

    @Override
    public Response<Void> updateImage(Long id, ProductImageUpdateDto dto) {
        log.info("Product Controller: update product image request...");

        if (!Objects.equals(id, dto.getId())) {
            throw new BadRequestException("Product id mismatch");
        }

        // update
        productService.updateImage(dto);

        return Response.noContent();
    }

    @Override
    public Response<Void> deleteProduct(Long id) {
        log.info("Product Controller: delete product request...");
        productService.deleteProduct(id);
        return Response.noContent();
    }
}
