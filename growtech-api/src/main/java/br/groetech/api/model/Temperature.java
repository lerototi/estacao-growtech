package br.groetech.api.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="temperatura")
public class Temperature {

	@Id
	@GeneratedValue
	@Column(name="id_temp")
	private Long idTemp;
	
	@Column
	private Double temperatura;
	
	@Column(name="data_registro")
	private Date dataRegistro;

	public Long getIdTemp() {
		return idTemp;
	}

	public void setIdTemp(Long idTemp) {
		this.idTemp = idTemp;
	}

	public Double getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(Double temperatura) {
		this.temperatura = temperatura;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
		
}
