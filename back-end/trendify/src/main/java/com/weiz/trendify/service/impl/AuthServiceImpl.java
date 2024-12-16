package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Token;
import com.weiz.trendify.entity.enums.ERole;
import com.weiz.trendify.entity.enums.UserStatus;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.AccountRepository;
import com.weiz.trendify.repository.RoleRepository;
import com.weiz.trendify.security.jwt.TokenProvider;
import com.weiz.trendify.service.AuthService;
import com.weiz.trendify.service.EmailService;
import com.weiz.trendify.service.dto.request.auth.*;
import com.weiz.trendify.service.dto.response.auth.LoginResponse;
import com.weiz.trendify.service.dto.response.auth.RegisterResponse;
import com.weiz.trendify.service.dto.response.auth.TokenResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthServiceImpl implements AuthService {

    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    AuthenticationManagerBuilder authenticationManagerBuilder;
    RoleRepository roleRepository;
    TokenProvider tokenProvider;
    EmailService emailService;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {
        final var authenticationToken = new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
        );

        final var authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        final var user = accountRepository.findByEmail(request.email())
                .orElse(null);

        // check status
        if (user != null) {
            switch (user.getStatus()) {

                case ACTIVE:
                    return new LoginResponse(
                            tokenProvider.generateToken(authentication),
                            tokenProvider.generateRefreshToken(user).getToken()
                    );
                case NOT_VERIFIED:
                    throw new BadRequestException("User is not verified");
                case BAN:
                    throw new BadRequestException("User is banned");
                default:
                    break;
            }
        }

        return null;
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // check email
        if (accountRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email has already existed");
        }

        // check phone number
        if (accountRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new BadRequestException("Phone number has already existed");
        }

        final var account = Account.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .userName(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .address(request.getAddress())
                .fullName(request.getFullName())
                .dateOfBirth(request.getDateOfBirth())
                .status(UserStatus.NOT_VERIFIED)
                .role(roleRepository.findByRoleName(ERole.CUSTOMER).orElseThrow(EntityNotFoundException::new))
                .build();

        accountRepository.save(account);

        return new RegisterResponse(
                account.getId(),
                account.getFullName(),
                account.getEmail(),
                account.getAddress()
        );
    }

    @Override
    @Transactional
    public TokenResponse refreshToken(TokenRequest request) {

        final var token = tokenProvider.getRefreshToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        tokenProvider.validateRefreshToken(token);

        final var account = token.getAccount();

        return TokenResponse.builder()
                .accessToken(tokenProvider.generateToken(SecurityContextHolder.getContext().getAuthentication()))
                .refreshToken(tokenProvider.generateRefreshToken(account).getToken())
                .build();
    }

    @Override
    public void sendVerifyEmail(@NotNull VerifyEmailRequest request) {

        // get user by email
        final var user = accountRepository.findByEmail(request.email())
                .orElseThrow(() -> new NotFoundException("Not found"));

        // check status
        if (user.getStatus() != UserStatus.NOT_VERIFIED) {
            throw new BadRequestException("Email has already been verified");
        }

        // generate random token 6-digits
        final var token = tokenProvider.generateVerifyToken(user);

        emailService.sendTokenVerificationEmail(user, token.getToken());
    }

    @Override
    public void confirmEmail(@NotNull ConfirmEmailRequest request) {

        // get user by email
        final var user = accountRepository.findByEmail(request.email())
                .orElseThrow(() -> new NotFoundException("Not found"));

        // check status
        if (user.getStatus() != UserStatus.NOT_VERIFIED) {
            throw new BadRequestException("Email has already been verified");
        }

        // check token
        tokenProvider.validateVerifyToken(request.token());

        // update status
        user.setStatus(UserStatus.ACTIVE);
        accountRepository.save(user);
    }
}
