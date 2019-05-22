package br.groetech.api.config;

//MQTT Core configuration 

public abstract class MQTTConfig {

	
	protected final String broker = "leroto-pc";
	protected final int qos = 0;
	protected Boolean hasSSL = false; /* By default SSL is disabled */
	protected Integer port = 1883; /* Default port */
	protected final String userName = "";
	protected final String password = "";
	protected final String TCP = "tcp://";
	protected final String SSL = "ssl://";
	
	//custom configuration
	
	protected abstract void config(String broker, Integer port, Boolean ssl, Boolean withUserNamePass);
	

	//default configuration
	
	protected abstract void config();
}
