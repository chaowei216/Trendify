package com.weiz.trendify.common;

import com.weiz.trendify.controller.error.MessageCode;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class AppConst {

    // message, code for exception
    public static final MessageCode SERVICE_ERROR = new MessageCode("500", "Service Error");
    public static final MessageCode BAD_REQUEST = new MessageCode("400", "Bad Request");
    public static final MessageCode NOT_FOUND = new MessageCode("404", "Not Found");

}
