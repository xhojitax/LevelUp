package com.levelup.backend.Usuario.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/ping")
    public String ping() {
        return "PONG - El servidor funciona correctamente";
    }

    @GetMapping("/hash")
    public String generateHash(@RequestParam String password) {
        String hash = passwordEncoder.encode(password);
        return "Hash BCrypt para '" + password + "':\n\n" + hash;
    }
}