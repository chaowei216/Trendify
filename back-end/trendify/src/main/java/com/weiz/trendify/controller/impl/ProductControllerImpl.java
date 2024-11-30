package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.ProductController;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.dto.request.product.PagingRequest;
import com.weiz.trendify.service.dto.request.product.ProductDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PageableData;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductControllerImpl implements ProductController {

    private final ProductService productService;

    @Override
    public Response<PagingResponse<ProductDto>> getProducts(@RequestBody final ProductSearchRequest request) {
        log.info("Product service: Get all products request");
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
    public Response<ProductDto> getProduct(@NonNull final Long id) {
        return null;
    }

    @Override
    public Response<ProductDto> createProduct(ProductDto dto) {
        return null;
    }

    @Override
    public Response<ProductDto> updateProduct(Long id, ProductDto dto) {
        return null;
    }

    @Override
    public Response<Void> deleteProduct(Long id) {
        return null;
    }
}