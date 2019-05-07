#include "DHT.h"

#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager


#define DHTPIN 12
#define DHTTYPE DHT11

ESP8266WebServer server(80);

DHT dht(DHTPIN, DHTTYPE);

//Chave ThinkSpeak
String apiKey = "2INQTXAD86M9OI40";
const char* serverTS = "api.thingspeak.com";

//output variables GPIO pins
const int output2 = 2;

//Variable to store the HTTP request
String header;

float t;
float h;

WiFiClient client;

void setup() {
    // put your setup code here, to run once:
    Serial.begin(115200);
    delay(10);
    dht.begin();
    //initialize the output variables as outputs
    pinMode(output2, OUTPUT);

    //Set outputs to Low
    digitalWrite(output2,LOW);
    

    //WiFiManager
    //Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wifiManager;
   
    //reset saved settings
    //wifiManager.resetSettings();
    
    //set custom ip for portal
    //wifiManager.setAPStaticIPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

    //fetches ssid and pass from eeprom and tries to connect
    //if it does not connect it starts an access point with the specified name
    //here  "AutoConnectAP"
    //and goes into a blocking loop awaiting configuration
    wifiManager.autoConnect("AutoConnectAP");
    
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    
    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");

    server.begin();

    
}

void loop() {

float h =dht.readHumidity();
float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
      Serial.println("failed to read from DHT sensor!");
      return;
    }

    if (client.connect(serverTS,80)){

      String postStr = apiKey;
      postStr +="&field1=";
      postStr += String(t);
      postStr +="&field2=";
      postStr += String(h);
      postStr +="\r\n\r\n";

      client.print("POST /update HTTP/1.1\n");
      client.print("Host: api.thingspeak.com\n");
      client.print("Connection: close\n");
                             client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
                             client.print("Content-Type: application/x-www-form-urlencoded\n");
                             client.print("Content-Length: ");
                             client.print(postStr.length());
                             client.print("\n\n");
                             client.print(postStr);
 
                             Serial.print("Temperature: ");
                             Serial.print(t);
                             Serial.print(" degrees Celcius, Humidity: ");
                             Serial.print(h);
                             Serial.println("%. Send to Thingspeak.");
    }
    client.stop();

    Serial.println("Waiting...");
  
  // thingspeak needs minimum 15 sec delay between updates, i've set it to 30 seconds
  delay(10000);



}
