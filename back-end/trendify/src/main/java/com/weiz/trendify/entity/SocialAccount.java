package com.weiz.trendify.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "social_accounts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SocialAccount extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(
            name = "provider",
            nullable = false,
            length = 20
    )
    String provider;

    @Column(
            name = "provider_id",
            nullable = false,
            length = 50
    )
    String providerId;

    @Column(
            name = "email",
            nullable = false
    )
    String email;

    @Column(
            name = "name",
            nullable = false,
            length = 100
    )
    String name;

    @ManyToOne(
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinColumn(name = "account_id")
    Account account;
}
