package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.AccountController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountControllerImpl implements AccountController {

    AccountService accountService;

    @Override
    public Response<List<AccountDto>> getAccounts() {
        log.info("Account Controller: Get all accounts request...");
        return Response.ok(accountService.getAccounts());
    }

    @Override
    public Response<AccountDto> getAccount(long id) {
        log.info("Account Controller: Get account request...");
        return Response.ok(accountService.getAccountById(id));
    }

    @Override
    public Response<AccountDto> updateAccount(long id, AccountUpdateDto accountDto) {
        log.info("Account Controller: Update account request...");

        if (id != accountDto.getId()) {
            throw new BadRequestException("Mismatch id");
        }

        return Response.ok(accountService.updateAccountInfo(accountDto));
    }
}
