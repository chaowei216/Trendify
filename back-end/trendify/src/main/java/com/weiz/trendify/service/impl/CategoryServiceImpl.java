package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.repository.CategoryRepository;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.mapper.category.CategoryMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryServiceImpl implements CategoryService {

    final CategoryRepository categoryRepository;
    final CategoryMapper categoryMapper;

    @Override
    public List<CategoryDto> getCategories() {
        log.info("Category Service: get all categories");
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }

    @Override
    public CategoryDto getCategoryById(int id) {
        log.info("Category Service: get category by id: {}", id);
        return categoryRepository.findById(id).map(categoryMapper::toDto).orElse(null);
    }

    @Override
    public Category getCategory(int id) {
        log.info("Category Service: get category: {}", id);
        return categoryRepository.findById(id).orElse(null);
    }
}
