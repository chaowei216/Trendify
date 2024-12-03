package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/categories")
@Tag(name = "category-controller")
public interface CategoryController {

    @Operation(summary = "Get all categories")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    Response<List<CategoryDto>> getCategories();

    @Operation(summary = "Get category")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    Response<CategoryDto> getCategory(@NonNull @PathVariable(name = "id") final int id);
}