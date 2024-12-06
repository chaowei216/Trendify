package com.weiz.trendify.service.mapper.order;

import com.weiz.trendify.entity.OrderDetail;
import com.weiz.trendify.service.dto.response.order.OrderItemDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        config = MapperConfig.class
)
public interface OrderItemMapper extends EntityMapper<OrderItemDto, OrderDetail> {

    @Override
    @Mapping(source = "orderDetail.numOfItems", target = "numOfItems")
    @Mapping(source = "orderDetail.totalPrice", target = "totalPrice")
    @Mapping(source = "orderDetail.productVariant.imageName", target = "imageName")
    @Mapping(source = "orderDetail.productVariant.product.name", target = "name")
    @Mapping(source = "orderDetail.productVariant.size", target = "size")
    @Mapping(source = "orderDetail.productVariant.color", target = "color")
    OrderItemDto toDto(OrderDetail orderDetail);
}
