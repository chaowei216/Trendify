package com.weiz.trendify.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(
            name = "product_name",
            nullable = false,
            length = 80
    )
    String name;

    @Column(
            name = "price",
            nullable = false
    )
    Double price;

    @Column(
            name = "default_image",
            nullable = false,
            length = 50
    )
    String defaultImage;

    @Column(
            name = "description",
            nullable = false
    )
    String description;

    @OneToMany(mappedBy = "product",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    List<ProductVariant> variants;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }
    )
    @JoinColumn(name = "category_id")
    Category category;
}
