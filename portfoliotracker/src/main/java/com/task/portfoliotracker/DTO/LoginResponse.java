package com.task.portfoliotracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private boolean result;
    private String message;
    private Long userId;
    private String userName;
    private String email;
}

