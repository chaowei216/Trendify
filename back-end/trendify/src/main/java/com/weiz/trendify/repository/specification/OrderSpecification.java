package com.weiz.trendify.repository.specification;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.entity.enums.OrderStatus;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class OrderSpecification {

    final String FIELD_ORDER_DATE = "orderDate";
    final String FIELD_TOTAL_PRICE = "totalPrice";
    final String FIELD_STATUS = "status";
    final String FIELD_ACCOUNT = "account";
    final String FIELD_ACCOUNT_ID = "id";

    private final List<Specification<Order>> specifications = new ArrayList<>();

    public static OrderSpecification builder() {
        return new OrderSpecification();
    }

    public OrderSpecification afterDate(final Date fromDate) {
        if (!Objects.isNull(fromDate)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.greaterThanOrEqualTo(root.get(FIELD_ORDER_DATE), fromDate)
            );
        }

        return this;
    }

    public OrderSpecification beforeDate(final Date toDate) {
        if (!Objects.isNull(toDate)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.lessThanOrEqualTo(root.get(FIELD_ORDER_DATE), toDate)
            );
        }

        return this;
    }

    public OrderSpecification withPrice(final Double fromPrice, final Double toPrice) {

        if (fromPrice != null && fromPrice > 0) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.greaterThanOrEqualTo(root.get(FIELD_TOTAL_PRICE), fromPrice)
            );
        }

        if (toPrice != null && toPrice > 0) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.lessThanOrEqualTo(root.get(FIELD_TOTAL_PRICE), toPrice)
            );
        }

        return this;
    }

    public OrderSpecification withStatus(OrderStatus status) {
        if (status != null) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get(FIELD_STATUS), status)
            );
        }

        return this;
    }

    public OrderSpecification withUserId(long id) {
        specifications.add(
                (root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get(FIELD_ACCOUNT).get(FIELD_ACCOUNT_ID), id)
        );

        return this;
    }

    public Specification<Order> build() {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder)).toArray(Predicate[]::new)));
    }
}
