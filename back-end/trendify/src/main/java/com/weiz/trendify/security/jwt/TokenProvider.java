package com.weiz.trendify.security.jwt;

import com.weiz.trendify.config.properties.SecurityProperties;
import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Token;
import com.weiz.trendify.entity.enums.TokenTypeEnum;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.exception.NotFoundException;
import com.weiz.trendify.repository.TokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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

    static String INVALID_TOKEN = "Invalid token";

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

        // revoke existing token
        final var tokens = tokenRepository.findByAccount(account);

        if (!tokens.isEmpty()) {
            tokens.forEach(this::revokeToken);

            // save all changes
            tokenRepository.saveAll(tokens);
        }

        // generate token
        Token token = Token.builder()
                .account(account)
                .token(UUID.randomUUID().toString())
                .isExpired(false)
                .isRevoked(false)
                .expirationDate(Instant.now().plusMillis(refreshTokenValidity))
                .tokenType(TokenTypeEnum.REFRESH_TOKEN)
                .build();

        // save to db
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

        if (token.getExpirationDate().isBefore(Instant.now())) {
            revokeToken(token);
            throw new BadRequestException(INVALID_REFRESH_TOKEN);
        }
    }

    /**
     * generate verify token
     * @param account account need verify email
     * @return token 6-digit
     */
    public Token generateVerifyToken(Account account) {
        final var existingTokens = account.getTokens()
                .stream()
                .filter(t -> !t.getIsExpired() && !t.getIsRevoked() && t.getExpirationDate().isAfter(Instant.now())
                        && t.getTokenType() == TokenTypeEnum.VERIFY_CODE).collect(Collectors.toSet());

        // revoke token
        existingTokens.forEach(this::revokeToken);

        final var token = generateToken();

        Token dbToken = Token.builder()
                .account(account)
                .tokenType(TokenTypeEnum.VERIFY_CODE)
                .token(token)
                .isExpired(false)
                .isRevoked(false)
                .expirationDate(Instant.now().plusMillis(1000 * 60 * 15))
                .build();

        tokenRepository.save(dbToken);
        return dbToken;
    }

    /**
     * generate forgot pass token
     * @param account account need send reset pass token
     * @return token 6-digit
     */
    public Token generateForgotPasswordCode(Account account) {
        final var existingTokens = account.getTokens()
                .stream()
                .filter(t -> !t.getIsExpired() && !t.getIsRevoked() && t.getExpirationDate().isAfter(Instant.now())
                        && t.getTokenType() == TokenTypeEnum.FORGOT_PASSWORD).collect(Collectors.toSet());

        // revoke token
        existingTokens.forEach(this::revokeToken);

        final var token = generateToken();

        Token dbToken = Token.builder()
                .account(account)
                .tokenType(TokenTypeEnum.FORGOT_PASSWORD)
                .token(token)
                .isExpired(false)
                .isRevoked(false)
                .expirationDate(Instant.now().plusMillis(1000 * 60 * 15))
                .build();

        tokenRepository.save(dbToken);
        return dbToken;
    }

    public Token getVerifyToken(String token) {
        return tokenRepository.findByToken(token).orElse(null);
    }

    public void validateDbToken(String token) {
        final var dbToken = getVerifyToken(token);


        if (dbToken == null) {
            throw new NotFoundException(INVALID_TOKEN);
        }

        if (dbToken.getIsExpired() || dbToken.getIsRevoked()) {
            revokeToken(dbToken);
            throw new BadRequestException(INVALID_TOKEN);
        }

        if (dbToken.getExpirationDate().isBefore(Instant.now())) {
            revokeToken(dbToken);
            throw new BadRequestException(INVALID_TOKEN);
        }

        revokeToken(dbToken);
    }

    public void revokeToken(Token token) {
        token.setIsExpired(true);
        token.setIsRevoked(true);
        tokenRepository.save(token);
    }

    /**
     * Generate a token
     *
     * @return token included 6 digits
     */
    private String generateToken() {
        Random random = new Random();
        int token = 100000 + random.nextInt(900000);
        return String.valueOf(token);
    }
}
