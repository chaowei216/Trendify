package com.weiz.trendify.controller.impl;

import com.weiz.trendify.controller.OrderController;
import com.weiz.trendify.exception.BadRequestException;
import com.weiz.trendify.service.OrderService;
import com.weiz.trendify.service.dto.request.PagingRequest;
import com.weiz.trendify.service.dto.request.order.OrderSearchRequest;
import com.weiz.trendify.service.dto.request.order.OrderUpdateDto;
import com.weiz.trendify.service.dto.response.PageableData;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class OrderControllerImpl implements OrderController {

    final OrderService orderService;

    @Override
    public Response<PagingResponse<OrderDto>> getOrders(OrderSearchRequest request) {
        log.info("Order Controller: get all orders request...");
        final Page<OrderDto> orders = orderService.getAllOrders(request);
        final PagingRequest paging = request.getPaging();
        return Response.ok(
                new PagingResponse<OrderDto>()
                        .setContents(orders.getContent())
                        .setPaging(
                                new PageableData()
                                        .setPageNumber(paging.getPage() - 1)
                                        .setTotalPage(orders.getTotalPages())
                                        .setPageSize(paging.getSize())
                                        .setTotalRecord(orders.getTotalElements())
                        )
        );
    }

    @Override
    public Response<PagingResponse<OrderDto>> getOrdersOfUser(Long id, OrderSearchRequest request) {
        log.info("Order Controller: get orders of user request...");
        final Page<OrderDto> orders = orderService.getAllOrdersOfUser(id, request);
        final PagingRequest paging = request.getPaging();
        return Response.ok(
                new PagingResponse<OrderDto>()
                        .setContents(orders.getContent())
                        .setPaging(
                                new PageableData()
                                        .setPageNumber(paging.getPage() - 1)
                                        .setTotalPage(orders.getTotalPages())
                                        .setPageSize(paging.getSize())
                                        .setTotalRecord(orders.getTotalElements())
                        )
        );
    }

    @Override
    public Response<OrderDetailDto> getOrderDetail(Long id) {
        log.info("Order Controller: get order detail request...");
        return Response.ok(orderService.getOrderDetail(id));
    }

    @Override
    public Response<OrderDetailDto> updateOrder(Long id, OrderUpdateDto orderUpdateDto) {
        log.info("Order Controller: update order request...");

        // check request
        if (!Objects.equals(id, orderUpdateDto.getId())) {
            throw new BadRequestException("Id do not match");
        }

        return Response.ok(orderService.updateOrder(orderUpdateDto));
    }
}
