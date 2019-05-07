package br.groetech.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.groetech.api.model.Temperature;

public interface TemperatureRepository extends JpaRepository<Temperature, Long> {

}
