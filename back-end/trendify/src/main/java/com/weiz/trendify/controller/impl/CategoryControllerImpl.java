package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.CategoryController;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
