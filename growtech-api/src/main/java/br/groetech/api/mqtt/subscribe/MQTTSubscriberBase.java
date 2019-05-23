package br.groetech.api.mqtt.subscribe;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import br.groetech.api.mqtt.publish.MQTTPublisherBase;

public interface MQTTSubscriberBase {
	
	public static final Logger logger = LoggerFactory.getLogger(MQTTSubscriberBase.class);
	
	/**
	 * Subscribe message
	 * 
	 * @param topic
	 * @param jasonMessage
	 * @throws MqttException 
	 */
	public void subscribeMessage(String topic);

	/**
	 * Disconnect MQTT Client
	 */
	public void disconnect();
	
}
