package br.groetech.api.resource;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.groetech.api.model.Humidity;
import br.groetech.api.repository.HumidityRepository;

@RestController
public class HumidityResource {

	
	@Autowired
	public HumidityRepository humidityRepository;
	
	PreparedStatement pstmt;

	public Humidity saveMqttReceivedHumidity(Humidity humidity) {
		
		

		Humidity humiditySaved = humidityRepository.save(humidity);
		
		SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		
		 System.out.println("Temperatura salva: "+humiditySaved.getHumidity()+" Hora Registro: "+humiditySaved.getRegistreDate());
		return humiditySaved;
	}
	
	
}
