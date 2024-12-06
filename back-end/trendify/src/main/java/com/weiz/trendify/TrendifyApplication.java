package com.weiz.trendify;

import com.weiz.trendify.config.properties.MinioProperties;
import com.weiz.trendify.config.properties.VnPayProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({MinioProperties.class, VnPayProperties.class})
public class TrendifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrendifyApplication.class, args);
    }

}
