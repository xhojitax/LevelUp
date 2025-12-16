package com.levelup.backend.Usuario.Model;

import lombok.Data;

@Data
public class LoginRequest {
    public String username;  // ✅ PUBLIC
    public String password;  // ✅ PUBLIC
}