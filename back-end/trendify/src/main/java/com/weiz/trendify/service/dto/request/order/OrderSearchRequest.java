package com.weiz.trendify.service.dto.request.order;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.enums.OrderStatus;
import com.weiz.trendify.repository.specification.OrderSpecification;
import com.weiz.trendify.service.dto.request.FilterRequest;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderSearchRequest extends FilterRequest<Order> {

    Date fromDate;
    Date toDate;
    Double fromPrice;
    Double toPrice;
    OrderStatus status;

    @Override
    public Specification<Order> specification() {
        return OrderSpecification.builder()
                .afterDate(fromDate)
                .beforeDate(toDate)
                .withPrice(fromPrice, toPrice)
                .withStatus(status)
                .build();
    }
}
