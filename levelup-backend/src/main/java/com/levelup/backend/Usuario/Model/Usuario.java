package com.levelup.backend.Usuario.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true, nullable = false, length = 50)
    public String username;

    @Column(nullable = false, length = 255)
    public String password;

    @Column(unique = true, nullable = false, length = 100)
    public String email;  //  PUBLIC

    @Column(nullable = false, length = 100)
    public String nombre;

    @Column(nullable = false, length = 20)
    public String rol;

    @Column(nullable = false)
    public Boolean activo = true;

    @Column(name = "fecha_creacion", updatable = false)
    public LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        if (this.activo == null) {
            this.activo = true;
        }
    }
}