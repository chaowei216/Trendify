package com.weiz.trendify.service.impl;

import com.weiz.trendify.entity.Account;
import com.weiz.trendify.entity.Order;
import com.weiz.trendify.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    static String EMAIL_SEND = "luutrieuvi2003@gmail.com";
    static String ORDER_CONFIRM_SUBJECT = "Order Confirm";

    JavaMailSender mailSender;
    SpringTemplateEngine templateEngine;

    @Override
    public void sendConfirmOrderEmail(@NotNull Order order) {
        try {
            log.info("Sending email to {}", order.getEmail());

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

            // load template email with content
            Context context = new Context();
            context.setVariable("customerName", order.getFullName());
            context.setVariable("order", order);
            String html = templateEngine.process("order-confirm", context);

            // send email
            helper.setTo(order.getEmail());
            helper.setText(html, true);
            helper.setSubject(ORDER_CONFIRM_SUBJECT);
            helper.setFrom(EMAIL_SEND);
            mailSender.send(mimeMessage);

            log.info("END... Sending email successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendTokenVerificationEmail(@NotNull Account account, @NotNull String token) {
        try {
            log.info("Sending email to {}", account.getEmail());

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

            // load template email with content
            Context context = new Context();
            context.setVariable("userName", account.getFullName());
            context.setVariable("token", token);
            String html = templateEngine.process("verify-email", context);

            // send email
            helper.setTo(account.getEmail());
            helper.setText(html, true);
            helper.setSubject(ORDER_CONFIRM_SUBJECT);
            helper.setFrom(EMAIL_SEND);
            mailSender.send(mimeMessage);

            log.info("END... Sending email successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
