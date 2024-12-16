package com.weiz.trendify.service.mapper.account;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.service.dto.response.account.AccountDto;
import com.weiz.trendify.service.mapper.EntityMapper;
import com.weiz.trendify.service.mapper.MapperConfig;
import org.mapstruct.Mapper;

@Mapper(
        config = MapperConfig.class
)
public interface AccountMapper extends EntityMapper<AccountDto, Account> {
}
