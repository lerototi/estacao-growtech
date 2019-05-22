package br.groetech.api.mqtt.subscribe;

import java.sql.Timestamp;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.stereotype.Component;

import br.groetech.api.config.MQTTConfig;

@Component
public class MQTTSubscriber extends MQTTConfig implements MqttCallback, MQTTSubscriberBase{

	
	private String brokerUrl = null;
	final private String colon = ":";
	final private String clientId = "growtech-api-subscribe";
	
	private MqttClient mqttClient = null;
	private MqttConnectOptions connectOptions = null;
	private MemoryPersistence persistence = null;
	
	public MQTTSubscriber() {
		this.config();
	}
	
	@Override
	public void connectionLost(Throwable cause) {
		logger.info("Connection Lost");
		
	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		
		String time = new Timestamp(System.currentTimeMillis()).toString();
		System.out.println();
		System.out.println("***********************************************************************");
		System.out.println("Message Arrived at Time: " + time + "  Topic: " + topic + "  Message: "
				+ new String(message.getPayload()));
		System.out.println("***********************************************************************");
		System.out.println();
		
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// Leave it blank for subscriber
		
	}
	
	 public void disconnect() {
		  try {
		   this.mqttClient.disconnect();
		  } catch (MqttException me) {
		   logger.error("ERROR", me);
		  }
		 }

	@Override
	protected void config(String broker, Integer port, Boolean ssl, Boolean withUserNamePass) {
		
		String protocol = this.TCP;
		if (ssl == true) {
			protocol = this.SSL;
		}
		
		this.brokerUrl = protocol + this.broker +colon + port;
		this.persistence = new MemoryPersistence();
		this.connectOptions = new MqttConnectOptions();
		
		try {
			this.mqttClient = new MqttClient(brokerUrl, clientId, persistence);
			this.connectOptions.setCleanSession(true);
			if (withUserNamePass = true) {
				if (password != null) {
					this.connectOptions.setPassword(this.password.toCharArray());
				}
				if (userName !=null) {
					this.connectOptions.setUserName(this.userName);
				}
			}
			this.mqttClient.connect(this.connectOptions);
			this.mqttClient.setCallback(this);
		} catch (MqttException me) {
			me.printStackTrace();
		}
		
	}

	@Override
	protected void config() {

		this.brokerUrl = this.TCP + this.broker + colon + this.port;
		this.persistence = new MemoryPersistence();
		this.connectOptions = new MqttConnectOptions();
		try {
			this.mqttClient = new MqttClient(brokerUrl, clientId, persistence);
			this.connectOptions.setCleanSession(true);
			this.mqttClient.connect(this.connectOptions);
			this.mqttClient.setCallback(this);
		} catch (MqttException me) {
			me.printStackTrace();
		}
		
	}

	@Override
	public void subscribeMessage(String topic) {
		try {
			this.mqttClient.subscribe(topic, this.qos);
		} catch (MqttException me) {
			me.printStackTrace();
		}
		
	}
	
	
	
	

	
	
}
