package com.weiz.trendify.repository.specification;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.enums.ProductStatus;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ProductSpecification {

    private final String FIELD_NAME = "name";
    private final String FIELD_PRICE = "price";
    private final String FIELD_CATEGORY = "category";
    private final String FIELD_CATEGORY_ID = "id";
    private final String FIELD_STATUS = "status";
    private final String FIELD_VARIANT = "variants";
    private final String FIELD_VARIANT_QUANTITY = "quantity";

    private final List<Specification<Product>> specifications = new ArrayList<>();

    public static ProductSpecification builder() {
        return new ProductSpecification();
    }

    public ProductSpecification withVariantQuantity() {
        specifications.add(
                (root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThan(root.get(FIELD_VARIANT).get(FIELD_VARIANT_QUANTITY), 0)
        );

        return this;
    }

    public ProductSpecification withStatus() {
        specifications.add(
                (root, query, criteriaBuilder) ->
                        criteriaBuilder.notEqual(root.get(FIELD_STATUS), ProductStatus.UNAVAILABLE)
        );

        return this;
    }

    public ProductSpecification withName(final String name) {
        System.out.println("here");
        if (!ObjectUtils.isEmpty(name)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(criteriaBuilder.upper(root.get(FIELD_NAME)), like(name))
            );
        }

        return this;
    }

    public ProductSpecification withPrice(final Double fromPrice, final Double toPrice) {
        if (fromPrice != null && fromPrice > 0) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.greaterThanOrEqualTo(root.get(FIELD_PRICE), fromPrice)
            );
        }

        if (toPrice != null && toPrice > 0) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.lessThanOrEqualTo(root.get(FIELD_PRICE), toPrice)
            );
        }

        return this;
    }

    public ProductSpecification withCategory(final Long categoryId) {
        if (categoryId != null && categoryId > 0) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get(FIELD_CATEGORY).get(FIELD_CATEGORY_ID), categoryId)
            );
        }

        return this;
    }

    private static String like(final String value) {
        return "%" + value.toUpperCase() + "%";
    }

    public Specification<Product> build() {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder)).toArray(Predicate[]::new)));
    }
}
