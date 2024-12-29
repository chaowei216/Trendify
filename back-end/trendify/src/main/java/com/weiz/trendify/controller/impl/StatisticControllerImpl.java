package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.StatisticController;
import com.weiz.trendify.service.StatisticService;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.statistic.StatisticDTO;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StatisticControllerImpl implements StatisticController {

    StatisticService statisticService;

    @Override
    public Response<StatisticDTO> getStatisticInfo() {
        log.info("Statistic Controller [GET]: get statistic info request...");
        return Response.ok(statisticService.getStatistic());
    }
}
