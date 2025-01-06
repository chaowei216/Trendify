package com.weiz.trendify.service.dto.response.statistic;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatisticDTO {

    int numOfCustomer;
    int numOfStaff;
    int numOfProduct;
    double revenue;
}
