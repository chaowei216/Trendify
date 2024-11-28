package com.weiz.trendify.entity;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_variant")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariant extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "size",
            nullable = false
    )
    ESize size;

    @Column(
            name = "color",
            nullable = false
    )
    String color;

    @Column(
            name = "quantity",
            nullable = false
    )
    Integer quantity;

    @Column(name = "image_name")
    String imageName;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
