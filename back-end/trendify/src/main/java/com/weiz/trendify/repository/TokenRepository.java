package com.weiz.trendify.repository;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
    List<Token> findByAccount(Account account);
}
