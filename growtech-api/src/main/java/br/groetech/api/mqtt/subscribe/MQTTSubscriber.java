package br.groetech.api.mqtt.subscribe;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.groetech.api.config.MQTTConfig;
import br.groetech.api.service.HumidityService;
import br.groetech.api.service.TemperatureService;

@Component
public class MQTTSubscriber extends MQTTConfig implements MqttCallback, MQTTSubscriberBase{

	
	private String brokerUrl = null;
	final private String colon = ":";
	final private String clientId = "growtech-api-subscribe";
	
	private MqttClient mqttClient = null;
	private MqttConnectOptions connectOptions = null;
	private MemoryPersistence persistence = null;
	
	@Autowired
	TemperatureService temperatureService;
	
	@Autowired
	HumidityService humidityService;
	
	public MQTTSubscriber() {
		this.config();
	}
	
	@Override
	public void connectionLost(Throwable cause) {
		logger.info("Connection Lost");
		
	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		
		LocalDateTime time = LocalDateTime.now();
		SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		
		
		
		System.out.println();
		System.out.println("***********************************************************************");
		System.out.println("Message Arrived at Time: " +time.toString() + "  Topic: " + topic + "  Message: "
				+ new String(message.getPayload()));
		System.out.println("***********************************************************************");
		System.out.println();
		
		if(topic.equals("vega/temperature")) {
			System.out.println("vega/temperature:");
			temperatureService.temperatureArrived(message, time);	
		}else if (topic.equals("vega/humidity")) {
			System.out.println("vega/humidity");
			humidityService.humidityArrived(message, time);
		}{
			
		}
		
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
		
		if (mqttClient.isConnected()) {
		System.out.println("Cliente Conectado");
			try {
				this.mqttClient.subscribe(topic, this.qos);
			} catch (MqttException me) {
				me.printStackTrace();
			}
		
		} else {
			
			try {
				mqttClient.reconnect();
			} catch (MqttException e) {
				System.out.println("Cliente não conectado");
				e.printStackTrace();
			}
		}
		
		
	}
	
	
	
	

	
	
}
