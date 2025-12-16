package com.levelup.backend.Usuario.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.levelup.backend.Usuario.Model.LoginRequest;
import com.levelup.backend.Usuario.Model.LoginResponse;
import com.levelup.backend.Usuario.Model.Usuario;
import com.levelup.backend.Usuario.Repository.UsuarioRepository;
import com.levelup.backend.config.JwtUtil;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // Si no existe lo agregamos

    // ----------------- LISTAR -----------------

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    // ----------------- CREAR USUARIO -----------------

    public Usuario crearUsuario(Usuario usuario) {

        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El username ya está registrado");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        if (!usuario.getRol().equalsIgnoreCase("ADMIN") &&
            !usuario.getRol().equalsIgnoreCase("USER")) {
            throw new RuntimeException("El rol debe ser ADMIN o USER");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }

        return usuarioRepository.save(usuario);
    }

    // ----------------- LOGIN -----------------

    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getUsername(), usuario.getRol());

        return new LoginResponse(
                token,
                usuario.getUsername(),
                usuario.getRol(),
                usuario.getNombre(),
                usuario.getEmail()
        );
    }

    // ----------------- ACTUALIZAR USUARIO -----------------

    public Usuario actualizarUsuario(Long id, Usuario datosActualizados) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setNombre(datosActualizados.getNombre());
        usuario.setEmail(datosActualizados.getEmail());
        usuario.setRol(datosActualizados.getRol());
        usuario.setActivo(datosActualizados.getActivo());

        // Si la contraseña viene en la actualización → volver a encriptarla
        if (datosActualizados.getPassword() != null && !datosActualizados.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(datosActualizados.getPassword()));
        }

        return usuarioRepository.save(usuario);
    }

    // ----------------- ELIMINAR -----------------

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
