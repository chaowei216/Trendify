package com.weiz.trendify.repository.specification;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Role;
import com.weiz.trendify.entity.enums.ERole;
import com.weiz.trendify.entity.enums.UserStatus;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public final class AccountSpecification {

    String FIELD_FULL_NAME = "fullName";
    String FIELD_EMAIL = "email";
    String FIELD_PHONE = "phoneNumber";
    String FIELD_ADDRESS = "address";
    String FIELD_STATUS = "status";
    String FIELD_ROLE = "role";
    String FIELD_ROLE_NAME = "roleName";

    List<Specification<Account>> specifications = new ArrayList<>();

    public static AccountSpecification builder() {
        return new AccountSpecification();
    }

    public AccountSpecification withFullName(final String fullName) {

        if (!ObjectUtils.isEmpty(fullName)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(criteriaBuilder.upper(root.get(FIELD_FULL_NAME)), like(fullName))
            );
        }

        return this;
    }

    public AccountSpecification withEmail(final String email) {

        if (!ObjectUtils.isEmpty(email)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(criteriaBuilder.upper(root.get(FIELD_EMAIL)), like(email))
            );
        }

        return this;
    }

    public AccountSpecification withPhoneNumber(final String phoneNumber) {

        if (!ObjectUtils.isEmpty(phoneNumber)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(root.get(FIELD_PHONE), like(phoneNumber))
            );
        }

        return this;
    }

    public AccountSpecification withAddress(final String address) {

        if (!ObjectUtils.isEmpty(address)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(criteriaBuilder.upper(root.get(FIELD_ADDRESS)), like(address))
            );
        }

        return this;
    }

    public AccountSpecification withStatus(final UserStatus status) {

        if (!ObjectUtils.isEmpty(status)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get(FIELD_STATUS), status)
            );
        }

        return this;
    }

    public AccountSpecification withRole(final ERole role) {

        if (!ObjectUtils.isEmpty(role)) {
            specifications.add(
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get(FIELD_ROLE).get(FIELD_ROLE_NAME), role)
            );
        }

        return this;
    }

    private static String like(final String value) {
        return "%" + value.toUpperCase() + "%";
    }

    public Specification<Account> build() {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder)).toArray(Predicate[]::new)));
    }
}
