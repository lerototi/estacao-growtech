package br.groetech.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.groetech.api.model.Humidity;

public interface HumidityRepository extends JpaRepository<Humidity, Long>{

}
