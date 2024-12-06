package com.weiz.trendify.service.mapper.order;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class,
        uses = {OrderItemMapper.class}
)
public interface OrderDetailMapper extends EntityMapper<OrderDetailDto, Order> {
}
