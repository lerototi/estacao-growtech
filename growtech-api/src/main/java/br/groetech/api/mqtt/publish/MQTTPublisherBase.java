package br.groetech.api.mqtt.publish;

public interface MQTTPublisherBase {
	
	/**
	 * Publish message
	 * 
	 * @param topic
	 * @param jasonMessage
	 */
	
	public void publisherMessage(String topic, String message);
	
	/**
	 * Disconnect MQTT Client
	 */
	
	public void disconect();

}
