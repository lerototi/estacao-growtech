package br.groetech.api.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.groetech.api.model.Humidity;
import br.groetech.api.repository.HumidityRepository;

@RestController
public class HumidityResource {

	
	@Autowired
	public HumidityRepository humidityRepository;
	
	

	public Humidity saveMqttReceivedHumidity(Humidity humidity) {

		Humidity humiditySaved = humidityRepository.save(humidity);
		
		 System.out.println("Temperatura salva: "+humiditySaved.getHumidity()+" Hora Registro: "+humiditySaved.getRegistreDate());
		return null;
	}
	
	
}
