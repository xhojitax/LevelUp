package com.levelup.backend.Usuario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.levelup.backend.Usuario.Model.Usuario;
import com.levelup.backend.Usuario.Repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Convertimos ADMIN → ROLE_ADMIN
        String roleSpring = usuario.getRol().startsWith("ROLE_")
                ? usuario.getRol()
                : "ROLE_" + usuario.getRol();

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(roleSpring.replace("ROLE_", "")) // Spring agrega ROLE_ automáticamente
                .build();
    }
}
