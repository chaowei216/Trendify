package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.enums.ERole;
import com.weiz.trendify.entity.enums.UserStatus;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.AccountRepository;
import com.weiz.trendify.repository.RoleRepository;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.dto.request.account.AccountSearchRequest;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.request.account.StaffAccountRequest;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import com.weiz.trendify.service.mapper.account.AccountMapper;
import com.weiz.trendify.service.mapper.account.AccountUpdateMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;

import static com.weiz.trendify.common.constants.AppConst.DEFAULT_PASSWORD;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;
    AccountUpdateMapper accountUpdateMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    @Override
    public Account getAccount(@NotNull Long id) {
        log.info("Account Service [GET]: Get account processing...");
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public AccountDto getAccountById(@NotNull Long id) {
        log.info("Account Service [GET]: Get account by id processing...");

        final var account = accountRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found"));

        return accountMapper.toDto(account);
    }

    @Override
    public AccountDto updateAccountInfo(@NotNull AccountUpdateDto accountDto) {
        log.info("Account Service [UPDATE]: Update account by id processing...");

        final var account = accountRepository.findById(accountDto.getId())
                .orElseThrow(() -> new NotFoundException("Not Found"));

        // check phone number
        final var similarAccount = accountRepository.findByPhoneNumber(accountDto.getPhoneNumber())
                .orElse(null);

        if (similarAccount != null &&
                !similarAccount.getPhoneNumber().equals(account.getPhoneNumber()) &&
                similarAccount.getPhoneNumber().equals(accountDto.getPhoneNumber())) {
            throw new BadRequestException("Phone number has already existed");
        }

        accountUpdateMapper.partialUpdate(account, accountDto);

        accountRepository.save(account);

        return accountMapper.toDto(account);
    }

    @Override
    public Page<AccountDto> getAccounts(@NotNull AccountSearchRequest request) {
        log.info("Account Service [GET ALL]: get all accounts processing...");

        // get all accounts
        return accountRepository.findAll(request.specification(), request.getPaging().pageable())
                .map(accountMapper::toDto);
    }

    @Override
    @Transactional
    public AccountDto createStaffAccount(@NotNull StaffAccountRequest request) {
        log.info("Account Service [CREATE]: Create staff account processing...");

        // check
        checkExistingAccount(request.getUserName(), request.getEmail(), request.getPhoneNumber());

        final var account = Account.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .userName(request.getUserName())
                .password(passwordEncoder.encode(DEFAULT_PASSWORD))
                .address(request.getAddress())
                .fullName(request.getFullName())
                .dateOfBirth(request.getDateOfBirth())
                .status(UserStatus.NOT_VERIFIED)
                .role(roleRepository.findByRoleName(ERole.STAFF).orElseThrow(EntityNotFoundException::new))
                .build();

        accountRepository.save(account);

        return accountMapper.toDto(account);
    }

    @Override
    @Transactional
    public void banAccount(@NotNull Long id) {
        log.info("Account Service [DELETE]: Ban account processing...");
        final var account = getAccount(id);

        if (account == null) {
            throw new NotFoundException("Not Found");
        }

        account.setStatus(UserStatus.BAN);
        accountRepository.save(account);
    }

    @Override
    public Account getAccountByEmail(@NotNull String email) {
        log.info("Account Service [GET]: Get account by email processing...");

        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Not Found"));
    }

    /**
     * Check if user is existed in system
     * @param username username of account
     * @param email email of account
     * @param phoneNumber phone number of account
     */
    private void checkExistingAccount(String username, String email, String phoneNumber) {
        // check email
        if (accountRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("Email has already existed");
        }

        // check username
        if (accountRepository.findByUserName(username).isPresent()) {
            throw new BadRequestException("Username has already existed");
        }

        // check phone number
        if (accountRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new BadRequestException("Phone number has already existed");
        }
    }
}
