package com.levelup.backend.Usuario.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private String rol;
    private String nombre;
    private String email;
}