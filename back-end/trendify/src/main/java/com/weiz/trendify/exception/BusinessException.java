package com.weiz.trendify.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.apache.logging.log4j.util.Strings;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusinessException extends RuntimeException {

    final String errorCode;
    final String message;

    public BusinessException(String message) {
        super(message);
        this.message = message;
        this.errorCode = Strings.EMPTY;
    }

    public BusinessException(String errorCode, String message, Throwable ex) {
        super(message, ex);
        this.message = message;
        this.errorCode = errorCode;
    }

    public BusinessException(String errorCode, String message) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
    }
}
