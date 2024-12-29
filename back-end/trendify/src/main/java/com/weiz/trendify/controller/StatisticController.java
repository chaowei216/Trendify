package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.statistic.StatisticDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping("/statistic")
@Tag(name = "statistic-controller")
public interface StatisticController {

    @Operation(summary = "Get statistic information")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured("ROLE_ADMIN")
    Response<StatisticDTO> getStatisticInfo();
}
