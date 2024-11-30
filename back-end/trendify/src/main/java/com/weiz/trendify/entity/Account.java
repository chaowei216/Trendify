package com.weiz.trendify.entity;

import com.weiz.trendify.entity.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Table(
        name = "accounts",
        indexes = {
                @Index(
                        columnList = "username",
                        unique = true
                ),
                @Index(
                        columnList = "email",
                        unique = true
                )
        }
)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Account extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(
            name = "full_name",
            nullable = false,
            length = 50
    )
    String fullName;

    @Column(
            name = "username",
            unique = true,
            updatable = false,
            length = 20
    )
    String userName;

    @Column(
            name = "password",
            nullable = false,
            length = 30
    )
    String password;

    @Column(
            name = "date_of_birth",
            nullable = false
    )
    Date dateOfBirth;

    @Column(
            name = "email",
            nullable = false
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

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false
    )
    UserStatus status;

    @OneToMany(
            mappedBy = "account",
            cascade = CascadeType.ALL
    )
    List<Token> tokens;

    @OneToMany(
            mappedBy = "account",
            cascade = CascadeType.ALL
    )
    List<SocialAccount> socialAccounts;

    @OneToMany(
            mappedBy = "account",
            cascade = CascadeType.ALL
    )
    List<Order> orders;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }
    )
    @JoinColumn(name = "role_id")
    Role role;
}
