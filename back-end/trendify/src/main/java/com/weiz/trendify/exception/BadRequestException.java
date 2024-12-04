package com.weiz.trendify.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BadRequestException extends RuntimeException {

    final String message;

    public BadRequestException(String message) {
        super(message);
        this.message = message;
    }

    public BadRequestException(String message, Throwable ex) {
        super(message, ex);
        this.message = message;
    }
}