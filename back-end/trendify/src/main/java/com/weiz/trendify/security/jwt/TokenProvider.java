package com.weiz.trendify.security.jwt;

import com.weiz.trendify.config.properties.SecurityProperties;
import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Token;
import com.weiz.trendify.entity.enums.TokenTypeEnum;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.repository.TokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenProvider {

    static String AUTHORITIES_KEY = "auth";

    static String INVALID_JWT_TOKEN = "Invalid JWT token";

    static String INVALID_REFRESH_TOKEN = "Invalid refresh token";

    SecretKey key;

    JwtParser jwtParser;

    long tokenValidity;

    long refreshTokenValidity;

    TokenRepository tokenRepository;

    public TokenProvider(final SecurityProperties securityProperties, TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;

        byte[] keyBytes;
        var secret = securityProperties.getSecretKey();
        log.debug("Using a Base64-encoded JWT secret key");
        keyBytes = Decoders.BASE64URL.decode(secret);
        key = Keys.hmacShaKeyFor(keyBytes);
        jwtParser = Jwts.parser().verifyWith(key).build();
        this.tokenValidity = 1000L * securityProperties.getExpiration();
        this.refreshTokenValidity = 1000L * securityProperties.getRefreshDuration();
    }

    public String generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + tokenValidity);

        return Jwts
                .builder()
                .subject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key)
                .expiration(validity)
                .compact();
    }

    public Token generateRefreshToken(Account account) {

        Token token = Token.builder()
                .account(account)
                .token(UUID.randomUUID().toString())
                .isExpired(false)
                .isRevoked(false)
                .expirationDate(Instant.now().plusMillis(refreshTokenValidity))
                .tokenType(TokenTypeEnum.REFRESH_TOKEN)
                .build();

        tokenRepository.save(token);

        return token;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = jwtParser.parseSignedClaims(token).getPayload();

        Collection<? extends GrantedAuthority> authorities = Arrays
                .stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                .filter(auth -> !auth.trim().isEmpty())
                .map("ROLE_"::concat)
                .map(SimpleGrantedAuthority::new)
                .toList();

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public Optional<Token> getRefreshToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public boolean validateToken(String authToken) {
        try {
            jwtParser.parseSignedClaims(authToken);
            return true;
        } catch (Exception e) {
            log.trace(INVALID_JWT_TOKEN, e);
            throw new BadCredentialsException(INVALID_JWT_TOKEN);
        }
    }

    public void validateRefreshToken(Token token) {

        if (token.getIsRevoked() && token.getIsExpired())
            throw new BadCredentialsException(INVALID_REFRESH_TOKEN);

        token.setIsExpired(true);
        token.setIsRevoked(true);
        tokenRepository.save(token);

        if (token.getExpirationDate().isBefore(Instant.now())) {
            throw new BadRequestException(INVALID_REFRESH_TOKEN);
        }
    }
}
