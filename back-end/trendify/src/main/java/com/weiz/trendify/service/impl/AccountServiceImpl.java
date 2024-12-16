package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.AccountRepository;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import com.weiz.trendify.service.mapper.account.AccountMapper;
import com.weiz.trendify.service.mapper.account.AccountUpdateMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;
    AccountUpdateMapper accountUpdateMapper;

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

        accountUpdateMapper.partialUpdate(account, accountDto);

        accountRepository.save(account);

        return accountMapper.toDto(account);
    }

    @Override
    public List<AccountDto> getAccounts() {
        return List.of();
    }
}
