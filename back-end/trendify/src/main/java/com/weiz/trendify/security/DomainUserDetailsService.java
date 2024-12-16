package com.weiz.trendify.security;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

/**
 * Implement function of interface to authenticate user from the database
 */
@Slf4j
@Component("userDetailsService")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DomainUserDetailsService implements UserDetailsService {

    AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Authenticating {}", username);
        if (new EmailValidator().isValid(username, null)) {
            return accountRepository
                    .findByEmail(username)
                    .map(this::createSpringSecurityUser)
                    .orElseThrow(() -> new UsernameNotFoundException("User with email " + username + " not found"));
        }

        final var lowerCaseLogin = username.toLowerCase(Locale.ENGLISH);
        return accountRepository
                .findByEmail(lowerCaseLogin)
                .map(this::createSpringSecurityUser)
                .orElseThrow(() -> new UsernameNotFoundException("User" + lowerCaseLogin + " not found"));
    }

    private User createSpringSecurityUser(Account account) {
        return new User(account.getEmail(), account.getPassword(), List.of(new SimpleGrantedAuthority(account.getRole().getRoleName().name())));
    }
}
