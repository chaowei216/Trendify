package com.weiz.trendify.entity;

import com.weiz.trendify.entity.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(
            name = "full_name"
    )
    String fullName;

    @Column(
            name = "email"
    )
    String email;

    @Column(
            name = "phone_number",
            nullable = false,
            length = 10
    )
    String phoneNumber;

    @Column(
            name = "address",
            nullable = false,
            length = 60
    )
    String address;

    @Column(
            name = "note"
    )
    String note;

    @Column(
            name = "order_date",
            nullable = false
    )
    Date orderDate;

    @Column(
            name = "total_price",
            nullable = false
    )
    Double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false
    )
    OrderStatus status;

    @Column(
            name = "payment_method",
            nullable = false
    )
    String paymentMethod;

    @ManyToOne(
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinColumn(name = "account_id")
    Account account;

    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL)
    List<OrderDetail> orderDetails;
}
