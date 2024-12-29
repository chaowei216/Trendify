package com.weiz.trendify.controller;

import com.weiz.trendify.service.dto.request.order.OrderSearchRequest;
import com.weiz.trendify.service.dto.request.order.OrderUpdateDto;
import com.weiz.trendify.service.dto.request.product.ProductSearchRequest;
import com.weiz.trendify.service.dto.response.PagingResponse;
import com.weiz.trendify.service.dto.response.Response;
import com.weiz.trendify.service.dto.response.category.CategoryDto;
import com.weiz.trendify.service.dto.response.order.OrderDetailDto;
import com.weiz.trendify.service.dto.response.order.OrderDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/orders")
@Tag(name = "order-controller")
public interface OrderController {

    @Operation(summary = "Get all orders")
    @Secured("ROLE_ADMIN")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/search")
    Response<PagingResponse<OrderDto>> getOrders(@RequestBody final OrderSearchRequest request);

    @Operation(summary = "Get all orders by user id")
    @Secured("ROLE_CUSTOMER")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/users/{id}")
    Response<PagingResponse<OrderDto>> getOrdersOfUser(@NotNull @PathVariable(name = "id") final Long id,
                                                       @RequestBody final OrderSearchRequest request);

    @Operation(summary = "Get order")
    @Secured({"ROLE_ADMIN", "ROLE_STAFF", "ROLE_CUSTOMER"})
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    Response<OrderDetailDto> getOrderDetail(@NotNull @PathVariable(name = "id") final Long id);

    @Operation(summary = "Update order")
    @Secured("ROLE_STAFF")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    Response<OrderDetailDto> updateOrder(@NotNull @PathVariable(name = "id") final Long id,
                                         @NotNull @RequestBody OrderUpdateDto orderUpdateDto);
}
