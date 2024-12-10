package com.weiz.trendify.config.init;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Role;
import com.weiz.trendify.entity.enums.ERole;
import com.weiz.trendify.entity.enums.UserStatus;
import com.weiz.trendify.repository.AccountRepository;
import com.weiz.trendify.repository.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountInit implements CommandLineRunner {

    AccountRepository accountRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        if (roleRepository.findAll().isEmpty()) {
            List<Role> roles = List.of(
                    Role.builder()
                            .roleName(ERole.ADMIN)
                            .build(),
                    Role.builder()
                            .roleName(ERole.STAFF)
                            .build(),
                    Role.builder()
                            .roleName(ERole.CUSTOMER)
                            .build()
            );

            roleRepository.saveAll(roles);
        }

        // check if it has any account in db
        if (accountRepository.count() > 0) {
            return;
        }

        // create account admin
        final var roleAdmin = roleRepository.findByRoleName(ERole.ADMIN)
                .orElseThrow(() -> new RuntimeException("Fail to load"));

        final var account = Account.builder()
                .userName("admin")
                .password(passwordEncoder.encode("12345"))
                .email("trendify@admin.com")
                .address("none")
                .dateOfBirth(Instant.now())
                .status(UserStatus.ACTIVE)
                .phoneNumber("0398371164")
                .fullName("ADMIN")
                .role(roleAdmin)
                .build();

        accountRepository.save(account);
    }
}
