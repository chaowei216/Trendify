package com.weiz.trendify.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(
            name = "token",
            nullable = false
    )
    String token;

    @Column(
            name = "token_type",
            nullable = false
    )
    String tokenType;

    @Column(
            name = "expiration_date",
            nullable = false
    )
    Date expirationDate;

    @Column(
            name = "is_revoked"
    )
    Boolean isRevoked;

    @Column(
            name = "is_expired"
    )
    Boolean isExpired;

    @ManyToOne(
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinColumn(name = "account_id")
    Account account;
}
