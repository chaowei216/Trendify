package com.weiz.trendify.config.properties;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(
        prefix = "jwt",
        ignoreUnknownFields = false
)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SecurityProperties {

    String secretKey;
    int expiration;
    int refreshDuration;
    String issuer;
    String audience;
}
