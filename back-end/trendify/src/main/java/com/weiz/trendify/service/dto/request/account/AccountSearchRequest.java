package com.weiz.trendify.service.dto.request.account;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Product;
import com.weiz.trendify.entity.Role;
import com.weiz.trendify.entity.enums.ERole;
import com.weiz.trendify.entity.enums.UserStatus;
import com.weiz.trendify.repository.specification.AccountSpecification;
import com.weiz.trendify.service.dto.request.FilterRequest;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;

@Data
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountSearchRequest extends FilterRequest<Account> {

    String fullName;
    String email;
    String phoneNumber;
    String address;
    UserStatus status;
    ERole role;

    @Override
    public Specification<Account> specification() {
        return AccountSpecification.builder()
                .withFullName(fullName)
                .withEmail(email)
                .withPhoneNumber(phoneNumber)
                .withAddress(address)
                .withStatus(status)
                .withRole(role)
                .build();
    }
}
