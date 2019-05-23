package br.groetech.api.model;

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
	private Date dataRegistro;

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

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
		
}
