package com.weiz.trendify.service.mapper.category;

import com.weiz.trendify.entity.Category;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface CategoryMapper extends EntityMapper<CategoryDto, Category> {
}
