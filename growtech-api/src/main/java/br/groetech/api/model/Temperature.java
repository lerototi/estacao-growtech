package br.groetech.api.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="temperature")
public class Temperature {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_temp")
	private Long idTemp;
	
	@Column
	private Double temperature;
	
	@Column(name="registre_date")
	private LocalDateTime dataRegistro;

	public Long getIdTemp() {
		return idTemp;
	}

	public void setIdTemp(Long idTemp) {
		this.idTemp = idTemp;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperatura(Double temperature) {
		this.temperature = temperature;
	}

	public LocalDateTime getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDateTime dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}


		
}
