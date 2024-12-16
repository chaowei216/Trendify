package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.AccountController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.dto.request.PagingRequest;
import com.weiz.trendify.service.dto.request.account.AccountSearchRequest;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.request.account.StaffAccountRequest;
import com.weiz.trendify.service.dto.response.PageableData;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountControllerImpl implements AccountController {

    AccountService accountService;

    @Override
    public Response<PagingResponse<AccountDto>> getAccounts(AccountSearchRequest request) {
        log.info("Account Controller: Get all accounts request...");
        final Page<AccountDto> accounts = accountService.getAccounts(request);
        final PagingRequest paging = request.getPaging();
        return Response.ok(
                new PagingResponse<AccountDto>()
                        .setContents(accounts.getContent())
                        .setPaging(
                                new PageableData()
                                        .setPageNumber(paging.getPage() - 1)
                                        .setTotalPage(accounts.getTotalPages())
                                        .setPageSize(paging.getSize())
                                        .setTotalRecord(accounts.getTotalElements())
                        )
        );
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

    @Override
    public Response<AccountDto> createStaffAccount(StaffAccountRequest accountDto) {
        log.info("Account Controller: Create staff account request...");
        return Response.created(accountService.createStaffAccount(accountDto));
    }

    @Override
    public Response<Void> banAccount(long id) {
        log.info("Account Controller: Ban account request...");
        accountService.banAccount(id);
        return Response.noContent();
    }
}
