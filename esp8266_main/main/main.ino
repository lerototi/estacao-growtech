/*****************************************************************
 * Growtech project
 *
 * Indoor cultive - baby leaf - monitoramento and automatization
 * 02/2019 - Andre Michelon
 *****************************************************************/

// Bibliotecas
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <WiFiManager.h>
#include "DHT.h";

#define DHTPIN 12
#define DHTTYPE DHT11

#define humidity_topic = "vega/sensor/humidade"
#define humidity_topic = "vega/sensor/temperatura"

// Wi-Fi
const char* ssid = "GVT-F403";
const char* password = "0503000384";
const char* mqttServer = "leroto-pc";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";

// Instancias
WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE, 11); 

void callback(char* topic, byte* payload, unsigned int length) {
  // Processa mensagens recebidas
  Serial.print("Recebido [");
  Serial.print(topic);
  Serial.print("] ");
  String s = "";
  for (int i = 0; i < length; i++) {
    s += (char)payload[i];
  }
  Serial.println(s);
}

void reconnect() {
  // Reconecta ao Broker
  while (!client.connected()) {
    Serial.println("Connectando...");
    // Conecta
    if (client.connect("ESP8266", mqttUser, mqttPassword)) {
      Serial.println("Conectado");

      // Assina topico "test"
      //client.subscribe("test");
    } else {
      // Falha na conexao
      Serial.print("Falha...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(10);


// Conecta ao Wi-FI// 
WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
  delay(500);
 }
    Serial.print("Connecting to WiFi..");
 
 Serial.println("\nConnected to the WiFi network");

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

// Testa conexao
  while(client.connected()) {
    Serial.println("Connecting to MQTT..");

    if(client.connect("ESP8266Client", mqttUser, mqttPassword)) {
      Serial.println("Connected");
    
    }else{
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

//client.publish("Temperatura: ", "");
client.subscribe("vega/temp");

}



unsigned long tTotal;
unsigned long t;
String msg;
float humid;
float temp;

String readDHTTemperature(){
  temp = dht.readTemperature();
  humid = dht.readHumidity();

  Serial.println(temp);
  return String(temp);
}


void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();


  // Publica mensagem a cada 5s
  if (millis() - t > 60000) {
    t = millis();
    tTotal += t;
    msg = "Tempo ativo " + String(t / 1000) + "s";

    readDHTTemperature();
    
    Serial.println("Temperatura: " + String(temp));
    Serial.println("Publicado: " + msg);
    client.publish("vega/temp", String(temp).c_str());
    client.publish("test", msg.c_str());
  }
}
