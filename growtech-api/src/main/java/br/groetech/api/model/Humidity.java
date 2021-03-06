package br.groetech.api.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="humidity")
public class Humidity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_humidity")
	private Long idHumidity;
	
	@Column
	private Double humidity;
	
	@Column(name="registre_date")
	private LocalDateTime registreDate;

	public Long getIdHumidity() {
		return idHumidity;
	}

	public void setIdHumidity(Long idHumidity) {
		this.idHumidity = idHumidity;
	}

	public Double getHumidity() {
		return humidity;
	}

	public void setHumidity(Double humidity) {
		this.humidity = humidity;
	}

	public LocalDateTime getRegistreDate() {
		return registreDate;
	}

	public void setRegistreDate(LocalDateTime registreDate) {
		this.registreDate = registreDate;
	}

	
	
	
}
