package com.weiz.trendify.service.mapper.product;

import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.service.dto.request.product.ProductVariantCreateDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface ProductVariantCreateMapper extends EntityMapper<ProductVariantCreateDto, ProductVariant> {
}
