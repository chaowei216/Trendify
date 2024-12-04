package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.CategoryRepository;
import com.weiz.trendify.service.CategoryService;
import com.weiz.trendify.service.dto.request.category.CategoryCreateDto;
import com.weiz.trendify.service.dto.request.category.CategoryUpdateDto;
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
        log.info("Category Service [GET ALL]: get all categories");
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }

    @Override
    public CategoryDto getCategoryById(int id) {
        log.info("Category Service [GET]: get category by id: {}", id);
        return categoryRepository.findById(id).map(categoryMapper::toDto).orElse(null);
    }

    @Override
    public Category getCategory(int id) {
        log.info("Category Service [GET]: get category: {}", id);
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public CategoryDto createCategory(CategoryCreateDto categoryDto) {
        log.info("Category Service [CREATE]: create category processing...");

        // find by name
        Category category = categoryRepository.findByName(categoryDto.getName());

        if (category != null) {
            // case EXIST - throw error
            throw new BadRequestException("Category has already existed");
        }

        // case NOT EXIST - create new one
        category = new Category();
        category.setName(categoryDto.getName());

        log.info("Category Service [CREATE]: save category");
        categoryRepository.save(category);

        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryDto updateCategory(CategoryUpdateDto categoryDto) {
        log.info("Category Service [UPDATE]: update category processing...");

        // find by id
        Category category = categoryRepository.findById(categoryDto.getId()).orElse(null);

        if (category == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Category not found");
        }

        // case EXIST - update
        category.setName(categoryDto.getName());

        log.info("Category Service [UPDATE]: save category");
        categoryRepository.save(category);

        return categoryMapper.toDto(category);
    }

    @Override
    public void deleteCategory(int id) {
        log.info("Category Service [DELETE]: delete category processing...");

        // find by id
        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            // case NOT EXIST - throw error
            throw new NotFoundException("Category not found");
        }

        log.info("Category Service [DELETE]: delete category with id: {}", id);
        categoryRepository.delete(category);
    }
}
