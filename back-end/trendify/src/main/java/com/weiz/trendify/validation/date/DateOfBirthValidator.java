package com.weiz.trendify.validation.date;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Instant;

public class DateOfBirthValidator implements ConstraintValidator<ValidBirth, Instant> {

    @Override
    public void initialize(ValidBirth constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Instant value, ConstraintValidatorContext context) {

        if (value == null) {
            return false;
        }

        return value.isBefore(Instant.now().plusSeconds(3600 * 24 * 365 * 13));
    }
}
