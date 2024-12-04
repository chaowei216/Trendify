package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.CategoryController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.dto.request.category.CategoryCreateDto;
import com.weiz.trendify.service.dto.request.category.CategoryUpdateDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.dto.response.product.ProductDetailDto;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CategoryControllerImpl implements CategoryController {

    final CategoryService categoryService;

    @Override
    public Response<List<CategoryDto>> getCategories() {
        log.info("Category Controller: get all categories request...");
        return Response.ok(categoryService.getCategories());
    }

    @Override
    public Response<CategoryDto> getCategory(int id) {
        log.info("Category Controller: get category request...");
        return Response.ok(categoryService.getCategoryById(id));
    }

    @Override
    public Response<CategoryDto> createCategory(CategoryCreateDto dto) {
        log.info("Category Controller: create category request...");
        return Response.created(categoryService.createCategory(dto));
    }

    @Override
    public Response<CategoryDto> updateCategory(int id, CategoryUpdateDto dto) {
        log.info("Category Controller: update category request...");

        // check matching id
        if (!Objects.equals(id, dto.getId())) {
            throw new BadRequestException("Category id mismatch");
        }

        return Response.ok(categoryService.updateCategory(dto));
    }

    @Override
    public Response<Void> deleteProduct(int id) {
        log.info("Category Controller: delete category request...");
        categoryService.deleteCategory(id);
        return Response.noContent();
    }
}
