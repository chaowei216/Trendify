package com.weiz.trendify.service;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.service.dto.request.category.CategoryCreateDto;
import com.weiz.trendify.service.dto.request.category.CategoryUpdateDto;
import com.weiz.trendify.service.dto.response.category.CategoryDto;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getCategories();
    CategoryDto getCategoryById(int id);
    Category getCategory(int id);
    CategoryDto createCategory(CategoryCreateDto categoryDto);
    CategoryDto updateCategory(CategoryUpdateDto categoryDto);
    void deleteCategory(int id);
}
