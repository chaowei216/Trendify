package com.weiz.trendify.service;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.service.dto.request.account.AccountSearchRequest;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.request.account.StaffAccountRequest;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

import java.util.List;

public interface AccountService {

    Account getAccount(@NonNull final Long id);

    AccountDto getAccountById(@NonNull final Long id);

    AccountDto updateAccountInfo(@NonNull final AccountUpdateDto accountDto);

    Page<AccountDto> getAccounts(@NonNull AccountSearchRequest request);

    AccountDto createStaffAccount(@NonNull final StaffAccountRequest request);

    void banAccount(@NonNull final Long id);

    Account getAccountByEmail(@NonNull final String email);
}
