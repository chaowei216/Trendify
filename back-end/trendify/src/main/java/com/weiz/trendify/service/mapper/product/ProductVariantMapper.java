package com.weiz.trendify.service.mapper.product;

import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.service.dto.response.product.ProductVariantDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface ProductVariantMapper extends EntityMapper<ProductVariantDto, ProductVariant> {
}
