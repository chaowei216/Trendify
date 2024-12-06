package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.repository.AccountRepository;
import com.weiz.trendify.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;

    @Override
    public Account getAccount(@NotNull Long id) {
        log.info("Account Service [GET]: Get account processing...");
        return accountRepository.findById(id).orElse(null);
    }
}
