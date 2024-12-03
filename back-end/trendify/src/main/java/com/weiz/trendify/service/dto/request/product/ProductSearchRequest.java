package com.weiz.trendify.service.dto.request.product;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.repository.specification.ProductSpecification;
import com.weiz.trendify.service.dto.request.FilterRequest;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;

@Data
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSearchRequest extends FilterRequest<Product> {

    String name;
    Double fromPrice;
    Double toPrice;
    String sort;
    String size;
    Long categoryId;

    @Override
    public Specification<Product> specification() {
        return ProductSpecification.builder()
                .withStatus()
                .withName(name)
                .withCategory(categoryId)
                .withPrice(fromPrice, toPrice)
                .build();
    }
}
