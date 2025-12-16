package com.levelup.backend.Usuario.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.backend.Usuario.Model.LoginRequest;
import com.levelup.backend.Usuario.Model.LoginResponse;
import com.levelup.backend.Usuario.Model.Usuario;
import com.levelup.backend.Usuario.Repository.UsuarioRepository;
import com.levelup.backend.config.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Login de usuarios")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Iniciar sesión", description = "Autentica usuario y retorna token JWT")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            System.out.println("🔍 Intentando login con usuario: " + request.username);
            
            // 1️⃣ Autenticar
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username, request.password)
            );
            
            System.out.println("✅ Autenticación exitosa para: " + request.username);
            
            // 2️⃣ Obtener usuario
            Usuario usuario = usuarioRepository.findByUsername(request.username)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            System.out.println("✅ Usuario encontrado: " + usuario.username + " con rol: " + usuario.rol);
            
            // 3️⃣ Generar token
            String token = jwtUtil.generateToken(usuario.username, usuario.rol);
            
            System.out.println("✅ Token JWT generado correctamente");
            
            // 4️⃣ Responder
            LoginResponse response = new LoginResponse(
                    token,
                    usuario.username,
                    usuario.rol,
                    usuario.nombre,
                    usuario.email
            );
            
            System.out.println("✅ LoginResponse creado, enviando respuesta");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception ex) {
            System.err.println("❌ ERROR EN LOGIN:");
            System.err.println("❌ Tipo de excepción: " + ex.getClass().getName());
            System.err.println("❌ Mensaje: " + ex.getMessage());
            ex.printStackTrace();
            
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Email/Usuario o contraseña incorrectos");
        }
    }
}