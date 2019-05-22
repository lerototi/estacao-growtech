package br.groetech.api.mqtt.publish;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import br.groetech.api.config.MQTTConfig;

@Component
public class MQTTPublisher extends MQTTConfig implements MqttCallback, MQTTPublisherBase{
	
	private String brokerUrl = null;
	
	final private String colon = ":";
	final private String clientId = "growtech-api-publish";
	
	private MqttClient mqttClient = null;
	private MqttConnectOptions connectionOptions = null;
	private MemoryPersistence persistence = null;
	
	private static final Logger logger = LoggerFactory.getLogger(MQTTPublisher.class);

	private MQTTPublisher() {
		this.config();
	}
	
	private MQTTPublisher(String broker, Integer port, Boolean ssl, Boolean withUserNamePass) {
		this.config(broker, port, ssl, withUserNamePass);
	
	}
	
	public static MQTTPublisher getInstance() {
		return new MQTTPublisher();
	}
	
	public static MQTTPublisher getInstance(String broker, Integer port, Boolean ssl, Boolean withUserNamePass) {
		return new MQTTPublisher(broker, port, ssl, withUserNamePass);
	}

	@Override
	public void publisherMessage(String topic, String message) {
		try {
			MqttMessage mqttmessage = new MqttMessage(message.getBytes());
			mqttmessage.setQos(this.qos);
			this.mqttClient.publish(topic, mqttmessage);
		} catch (MqttException me) {
			logger.error("ERROR", me);
		}

		
	}

	@Override
	public void disconect() {
		try {
			this.mqttClient.disconnect();
		} catch (MqttException me) {
			logger.error("ERROR", me);
		}
		
	}

	@Override
	public void connectionLost(Throwable cause) {
		logger.info("Connection Lost");
		
	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		// Leave it blank for Publisher
		
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		logger.info("delivery completed");
		
	}

	@Override
	protected void config(String broker, Integer port, Boolean ssl, Boolean withUserNamePass) {
		String protocal = this.TCP;
		if (true == ssl) {
			protocal = this.SSL;
		}

		this.brokerUrl = protocal + this.broker + colon + port;
		this.persistence = new MemoryPersistence();
		this.connectionOptions = new MqttConnectOptions();

		try {
			this.mqttClient = new MqttClient(brokerUrl, clientId, persistence);
			this.connectionOptions.setCleanSession(true);
			if (true == withUserNamePass) {
				if (password != null) {
					this.connectionOptions.setPassword(this.password.toCharArray());
				}
				if (userName != null) {
					this.connectionOptions.setUserName(this.userName);
				}
			}
			this.mqttClient.connect(this.connectionOptions);
			this.mqttClient.setCallback(this);
		} catch (MqttException me) {
			logger.error("ERROR", me);
		}
		
	}

	@Override
	protected void config() {
		this.brokerUrl = this.TCP + this.broker + colon + this.port;
		this.persistence = new MemoryPersistence();
		this.connectionOptions = new MqttConnectOptions();
		try {
			this.mqttClient = new MqttClient(brokerUrl, clientId, persistence);
			this.connectionOptions.setCleanSession(true);
			this.mqttClient.connect(this.connectionOptions);
			this.mqttClient.setCallback(this);
		} catch (MqttException me) {
			logger.error("ERROR", me);
		}
		
	}

}
