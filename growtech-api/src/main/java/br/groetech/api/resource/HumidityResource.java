package br.groetech.api.resource;

import org.springframework.beans.factory.annotation.Autowired;

import br.groetech.api.model.Humidity;
import br.groetech.api.repository.HumidityRepository;

public class HumidityResource {

	
	@Autowired
	private HumidityRepository humidityRepository;
	
	

	public Humidity saveMqttReceivedMessage(Humidity humidity) {

		Humidity humiditySaved = humidityRepository.save(humidity);
		
		 System.out.println("Temperatura salva: "+humiditySaved.getHumidity()+" Hora Registro: "+humiditySaved.getRegistreDate());
		return null;
	}
	
	
}
