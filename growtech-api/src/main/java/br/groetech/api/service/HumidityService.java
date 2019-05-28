package br.groetech.api.service;

import java.sql.Date;
import java.time.LocalDateTime;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.groetech.api.model.Humidity;
import br.groetech.api.repository.HumidityRepository;
import br.groetech.api.resource.HumidityResource;

@Service
public class HumidityService {
	
	@Autowired
	HumidityResource humidityResource;


	public void humidityArrived(MqttMessage message, LocalDateTime time) {
		
		Humidity humidity = new Humidity();
		humidity.setRegistreDate(time);
		humidity.setHumidity(Double.parseDouble(new String (message.getPayload())));
		
		humidity = humidityResource.saveMqttReceivedHumidity(humidity);
		
	}

}
