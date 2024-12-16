package com.weiz.trendify.service;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import org.springframework.lang.NonNull;

import java.util.List;

public interface AccountService {

    Account getAccount(@NonNull final Long id);

    AccountDto getAccountById(@NonNull final Long id);

    AccountDto updateAccountInfo(@NonNull final AccountUpdateDto accountDto);

    List<AccountDto> getAccounts();
}
