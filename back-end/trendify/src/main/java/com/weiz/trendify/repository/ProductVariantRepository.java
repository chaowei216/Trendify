package com.weiz.trendify.repository;

import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.ProductVariant;
import com.weiz.trendify.entity.enums.ESize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {

    ProductVariant findBySizeAndColorAndProduct(ESize size, String color, Product product);
}
