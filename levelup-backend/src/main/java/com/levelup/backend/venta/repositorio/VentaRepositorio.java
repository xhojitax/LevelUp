package com.levelup.backend.venta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.backend.venta.modelo.Venta;

public interface VentaRepositorio extends JpaRepository<Venta, Long> {
    List<Venta> findByClienteId(Long clienteId);
    void deleteByClienteId(Long clienteId); 
}
