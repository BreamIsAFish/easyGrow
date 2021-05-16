#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//#include "DHT.h"

//#define DHTPIN D1
//#define DHTTYPE DHT11
#define LED1 16
#define PUMP_ON_PIN 5
#define PUMP_AUTO_PIN 4
#define LAMP_ON_PIN 0

//const char* ssid = "Sleepy_Hollow";
//const char* password = "6X4VP97684";

const char* ssid = "iPhone";
const char* password = "password";
const char* mqtt_server = "broker.netpie.io";
const int mqtt_port = 1883;
const char* mqtt_Client = "e97157c7-82cb-47af-818f-a51a7ea9412d";
const char* mqtt_username = "iNjQcUqzU7KkYZooRa2pgdxXwCLRjV46";
const char* mqtt_password = "jNC8SZNJIMe$7~*RAby)J!jVTNb4MrBm";

WiFiClient espClient;
PubSubClient client(espClient);

char msg[70];

int v1 = 20, v2 = 0;

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection…");
        if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
            Serial.println("connected");
            client.subscribe("@msg/led");
            client.subscribe("@msg/lamp");
            client.subscribe("@msg/pump");
            client.subscribe("@msg/autoPump");
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println("try again in 5 seconds");
            delay(5000);
        }
    }
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    String message;
    for (int i = 0; i < length; i++) {
        message = message + (char)payload[i];
    }
    Serial.println(message);
    if(String(topic) == "@msg/led") {
        if(message == "on"){
            digitalWrite(LED1,HIGH);
            client.publish("@shadow/data/update", "{\"data\" : {\"led\" : \"on\"}}");
            Serial.println("LED on");
        }
        else if (message == "off"){
            digitalWrite(LED1,LOW);
            client.publish("@shadow/data/update", "{\"data\" : {\"led\" : \"off\"}}");
            Serial.println("LED off");
        }
    }
    if(String(topic) == "@msg/pump") {
        if(message == "on"){
            digitalWrite(PUMP_ON_PIN,HIGH);
            client.publish("@shadow/data/update", "{\"data\" : {\"pump\" : \"on\"}}");
            Serial.println("Pump on");
        }
        else if (message == "off"){
            digitalWrite(PUMP_ON_PIN,LOW);
            client.publish("@shadow/data/update", "{\"data\" : {\"pump\" : \"off\"}}");
            Serial.println("Pump off");
        }
    }
    if(String(topic) == "@msg/autoPump") {
        if(message == "on"){
            digitalWrite(PUMP_AUTO_PIN,HIGH);
            client.publish("@shadow/data/update", "{\"data\" : {\"autoPump\" : \"on\"}}");
            Serial.println("AutoPump on");
        }
        else if (message == "off"){
            digitalWrite(PUMP_AUTO_PIN,LOW);
            client.publish("@shadow/data/update", "{\"data\" : {\"autoPump\" : \"off\"}}");
            Serial.println("AutoPump off");
        }
    }
    if(String(topic) == "@msg/lamp") {
        if(message == "on"){
            digitalWrite(LAMP_ON_PIN,HIGH);
            client.publish("@shadow/data/update", "{\"data\" : {\"lamp\" : \"on\"}}");
            Serial.println("Lamp on");
        }
        else if (message == "off"){
            digitalWrite(LAMP_ON_PIN,LOW);
            client.publish("@shadow/data/update", "{\"data\" : {\"lamp\" : \"off\"}}");
            Serial.println("Lamp off");
        }
    }
}

void setup() {
    pinMode(LED1,OUTPUT);
    pinMode(PUMP_ON_PIN,OUTPUT);
    pinMode(PUMP_AUTO_PIN,OUTPUT);
    pinMode(LAMP_ON_PIN,OUTPUT);
    Serial.begin(9600);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");

    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);

}

void loop() {
    //int humidity = dht.readHumidity();
    //int temperature = dht.readTemperature();

    String str = Serial.readStringUntil('\n');
    if (str != "-1") {
      Serial.println(str + " ");
      if (str == "start") {
        String humid_str, light_str, temp_str;
        humid_str = Serial.readStringUntil('\n');
        light_str = Serial.readStringUntil('\n');
        temp_str = Serial.readStringUntil('\n');
        Serial.print(humid_str + " ");
        Serial.print(light_str + " ");
        Serial.println(temp_str);

        if (!client.connected()) {
            reconnect();
        }
        client.loop();
        String data = "{\"data\": {\"humid\":" + humid_str + ", \"temperature\":" + temp_str +", \"light\":" + light_str + "}}";
        Serial.println(data);
        data.toCharArray(msg, (data.length() + 1));
        client.publish("@shadow/data/update", msg);
      }
    }
}
