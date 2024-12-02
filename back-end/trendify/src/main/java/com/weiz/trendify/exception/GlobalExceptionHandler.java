package com.weiz.trendify.exception;

import com.weiz.trendify.common.AppConst;
import com.weiz.trendify.controller.error.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler implements ResponseErrorHandler {

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse result) {
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ErrorResponse> internalServerError(ErrorResponse result) {
        return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorResponse> notFound(ErrorResponse result) {
        return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ErrorResponse> forbidden(ErrorResponse result) {
        return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("service", e.getMessage());
        return internalServerError(new ErrorResponse(AppConst.SERVICE_ERROR.getCode(), AppConst.SERVICE_ERROR.getMessage(), map));
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("service", e.getMessage());
        return badRequest(
                new ErrorResponse(AppConst.BAD_REQUEST.getCode(), AppConst.BAD_REQUEST.getMessage(), map)
        );
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> handleBadRequestException(NotFoundException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("service", e.getMessage());
        return notFound(
                new ErrorResponse(AppConst.NOT_FOUND.getCode(), AppConst.NOT_FOUND.getMessage(), map)
        );
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        final Map<String, Object> objResult = new HashMap<>();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            objResult.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        final ErrorResponse response = new ErrorResponse(AppConst.BAD_REQUEST.getCode(),
                "Validation exception", objResult);

        return badRequest(response);
    }


    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return false;
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {

    }
}
