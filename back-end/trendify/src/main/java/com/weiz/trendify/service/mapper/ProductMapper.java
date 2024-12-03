package com.weiz.trendify.service.mapper;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.service.dto.response.product.ProductDto;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface ProductMapper extends EntityMapper<ProductDto, Product> {
}
