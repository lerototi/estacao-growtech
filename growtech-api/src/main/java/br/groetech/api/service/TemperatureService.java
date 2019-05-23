package br.groetech.api.service;

import java.sql.Date;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.groetech.api.model.Temperature;
import br.groetech.api.resource.TemperatureResource;

@Service
public class TemperatureService {

	Temperature temperature;
	
	@Autowired
	TemperatureResource temperatureResource;
	
	public void temperatureArrived(MqttMessage message, Date time) {
		
		temperature = new Temperature();
		temperature.setDataRegistro(time);
		temperature.setTemperatura(Double.parseDouble(new String(message.getPayload())));
		
		temperatureResource.saveMqttReceivedTemperature(temperature);
		
		
		
	}

	
	
	
}
