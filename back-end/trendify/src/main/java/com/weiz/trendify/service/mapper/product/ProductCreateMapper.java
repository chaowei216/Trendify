package com.weiz.trendify.service.mapper.product;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.service.dto.request.product.ProductCreateDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        config = MapperConfig.class,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ProductCreateMapper extends EntityMapper<ProductCreateDto, Product> {
}
