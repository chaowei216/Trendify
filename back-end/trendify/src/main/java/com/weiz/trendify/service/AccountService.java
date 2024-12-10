package com.weiz.trendify.service;

import com.weiz.trendify.entity.Account;
import org.springframework.lang.NonNull;

public interface AccountService {

    Account getAccount(@NonNull final Long id);
}
