package com.weiz.trendify.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(
            @Value("${open.api.title}") String title,
            @Value("${open.api.version}") String version,
            @Value("${open.api.description}") String description
    ) {
        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(description)
                        .license(new License().name("API License")
                                .url("http://domain.vn/license"))
                )
                .servers(List.of(new Server().url("http://localhost:8080").description("Server test")));
    }
}
