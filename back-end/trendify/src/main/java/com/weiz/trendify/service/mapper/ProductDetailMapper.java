package com.weiz.trendify.service.mapper;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.service.dto.request.product.ProductDetailDto;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface ProductDetailMapper extends EntityMapper<ProductDetailDto, Product> {
}
