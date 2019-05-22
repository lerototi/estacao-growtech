package br.groetech.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.groetech.api.mqtt.subscribe.MQTTSubscriber;
import br.groetech.api.mqtt.subscribe.MQTTSubscriberBase;

@Component
public class MessageListener implements Runnable {

	@Autowired
	MQTTSubscriberBase subscriber;
	
	@Override
	public void run() {
		while(true) {
			subscriber.subscribeMessage("test");
		}

	}

}
