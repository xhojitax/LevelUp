package com.levelup.backend.logistica.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.levelup.backend.logistica.modelo.Envio;

@Repository
public interface EnvioRepositorio extends JpaRepository<Envio, Long>{  
}
