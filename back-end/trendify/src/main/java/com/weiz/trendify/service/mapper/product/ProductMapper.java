package com.weiz.trendify.service.mapper.product;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface ProductMapper extends EntityMapper<ProductDto, Product> {
}
