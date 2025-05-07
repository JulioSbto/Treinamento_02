CREATE DATABASE base_locadora;

USE base_locadora;

CREATE TABLE tb_veiculos (
    placa VARCHAR(8) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(60) NOT NULL,
    valor DECIMAL(10, 2)
);
