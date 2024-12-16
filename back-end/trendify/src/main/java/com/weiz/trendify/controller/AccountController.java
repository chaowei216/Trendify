package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.account.AccountSearchRequest;
import com.weiz.trendify.service.dto.request.account.AccountUpdateDto;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/accounts")
@Tag(name = "account-controller")
public interface AccountController {

    @Operation(summary = "Get all accounts")
    @Secured("ROLE_ADMIN")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/search")
    Response<PagingResponse<AccountDto>> getAccounts(@RequestBody final AccountSearchRequest request);

    @Operation(summary = "Get account")
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    Response<AccountDto> getAccount(@NotNull @PathVariable(name = "id") final long id);

    @Operation(summary = "Update account")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_STAFF')")
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{id}")
    Response<AccountDto> updateAccount(@NotNull @PathVariable(name = "id") final long id,
                                       @Valid @RequestBody final AccountUpdateDto accountDto);
}
