package com.weiz.trendify.repository.specification;

import com.weiz.trendify.entity.Account;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class AccountSpecification {

    private final List<Specification<Account>> specifications = new ArrayList<>();

    public static AccountSpecification builder() {
        return new AccountSpecification();
    }



    public Specification<Account> build() {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.and(specifications.stream()
                .filter(Objects::nonNull)
                .map(s -> s.toPredicate(root, query, criteriaBuilder)).toArray(Predicate[]::new)));
    }
}
