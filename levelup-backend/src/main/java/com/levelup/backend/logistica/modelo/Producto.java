package com.levelup.backend.logistica.modelo;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String nombre;
    
    @Column(length = 2000)
    private String descripcion;
    
    @Column(nullable = false)
    private Double precio;
    
    @Column(nullable = false)
    private Integer stock;
    
    @Column(length = 500)
    private String imagen;
    
    // Atributos específicos para productos gaming
    
    @Column(nullable = false, length = 100)
    private String categoria; // Juegos, Consolas, Accesorios, Merchandising
    
    @Column(length = 100)
    private String plataforma; // PS5, Xbox, PC, Nintendo Switch, Multi
    
    @Column(length = 50)
    private String clasificacion; // E (Everyone), E10+, T (Teen), M (Mature), AO, RP
    
    @Column(length = 200)
    private String desarrollador;
    
    @Column(length = 200)
    private String publisher;
    
    @Column(name = "fecha_lanzamiento")
    private LocalDate fechaLanzamiento;
    
    @Column(length = 100)
    private String genero; // Acción, RPG, Aventura, Deportes, Shooter, etc.
    
    private Boolean esNuevo; // Juego nuevo o usado
    
    private Boolean disponible; // Disponibilidad inmediata
    
    @Column(name = "creado_en")
    private LocalDate creadoEn;
    
    @Column(name = "actualizado_en")
    private LocalDate actualizadoEn;
    
    @PrePersist
    protected void onCreate() {
        creadoEn = LocalDate.now();
        actualizadoEn = LocalDate.now();
        if (disponible == null) {
            disponible = true;
        }
        if (esNuevo == null) {
            esNuevo = true;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        actualizadoEn = LocalDate.now();
    }
}