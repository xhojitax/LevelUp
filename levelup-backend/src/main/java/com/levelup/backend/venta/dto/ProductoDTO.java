package com.levelup.backend.venta.dto;

import java.time.LocalDate;

public class ProductoDTO {
    
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String imagen;
    private String categoria;
    private String plataforma;
    private String clasificacion;
    private String desarrollador;
    private String publisher;
    private LocalDate fechaLanzamiento;
    private String genero;
    private Boolean esNuevo;
    private Boolean disponible;

    // Constructor vacío
    public ProductoDTO() {
    }

    // Constructor completo
    public ProductoDTO(Long id, String nombre, String descripcion, Double precio, 
                      Integer stock, String imagen, String categoria, String plataforma,
                      String clasificacion, String desarrollador, String publisher,
                      LocalDate fechaLanzamiento, String genero, Boolean esNuevo, 
                      Boolean disponible) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.categoria = categoria;
        this.plataforma = plataforma;
        this.clasificacion = clasificacion;
        this.desarrollador = desarrollador;
        this.publisher = publisher;
        this.fechaLanzamiento = fechaLanzamiento;
        this.genero = genero;
        this.esNuevo = esNuevo;
        this.disponible = disponible;
    }

    // Constructor básico (retrocompatibilidad)
    public ProductoDTO(Long id, String nombre, Double precio, Integer stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
    
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    
    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }
    
    public String getClasificacion() { return clasificacion; }
    public void setClasificacion(String clasificacion) { this.clasificacion = clasificacion; }
    
    public String getDesarrollador() { return desarrollador; }
    public void setDesarrollador(String desarrollador) { this.desarrollador = desarrollador; }
    
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }
    
    public LocalDate getFechaLanzamiento() { return fechaLanzamiento; }
    public void setFechaLanzamiento(LocalDate fechaLanzamiento) { this.fechaLanzamiento = fechaLanzamiento; }
    
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    
    public Boolean getEsNuevo() { return esNuevo; }
    public void setEsNuevo(Boolean esNuevo) { this.esNuevo = esNuevo; }
    
    public Boolean getDisponible() { return disponible; }
    public void setDisponible(Boolean disponible) { this.disponible = disponible; }
}