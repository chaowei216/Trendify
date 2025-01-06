package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Order;
import com.weiz.trendify.service.AccountService;
import com.weiz.trendify.service.OrderService;
import com.weiz.trendify.service.ProductService;
import com.weiz.trendify.service.StatisticService;
import com.weiz.trendify.service.dto.response.statistic.StatisticDTO;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticServiceImpl implements StatisticService {

    AccountService accountService;
    ProductService productService;
    OrderService orderService;

    @Override
    public StatisticDTO getStatistic() {
        log.info("Statistic Service [GET]: get statistic information processing...");

        // init return object
        StatisticDTO statisticDTO = new StatisticDTO();

        // set num of customer
        statisticDTO.setNumOfCustomer(accountService.getCustomerAccounts().size());

        // set num of staff
        statisticDTO.setNumOfStaff(accountService.getStaffAccounts().size());

        // set num of product
        statisticDTO.setNumOfProduct(productService.getProducts().size());

        // set revenue
        statisticDTO.setRevenue(
                orderService.getOrders().stream().mapToDouble(Order::getTotalPrice).sum()
                );

        return statisticDTO;
    }
}
