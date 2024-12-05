package com.weiz.trendify.service.mapper.order;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        config = MapperConfig.class
)
public interface OrderMapper extends EntityMapper<OrderDto, Order> {
}
