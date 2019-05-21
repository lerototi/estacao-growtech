package br.groetech.api.mqtt.subscribe;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import br.groetech.api.mqtt.publish.MQTTPublisherBase;

public interface MQTTSubscriberBase {
	
	public static final Logger logger = LoggerFactory.getLogger(MQTTPublisherBase.class);
	
	/**
	 * Subscribe message
	 * 
	 * @param topic
	 * @param jasonMessage
	 */
	public void subscribeMessage(String topic);

	/**
	 * Disconnect MQTT Client
	 */
	public void disconnect();
	
}
