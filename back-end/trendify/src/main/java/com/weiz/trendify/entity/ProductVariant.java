package com.weiz.trendify.entity;

import com.weiz.trendify.entity.enums.ESize;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "product_variants")
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

    @Column(
            name = "image_name",
            nullable = false,
            columnDefinition = "text"
    )
    String imageName;

    @ManyToOne(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH}
    )
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "productVariant",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    List<OrderDetail> orderDetails;
}
