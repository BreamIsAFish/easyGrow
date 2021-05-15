#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//#include "DHT.h"

//#define DHTPIN D1
//#define DHTTYPE DHT11
#define LED1 16

const char* ssid = "dseprivate";
const char* password = "fugvlvugoH9[kpot0tU";
const char* mqtt_server = "broker.netpie.io";
const int mqtt_port = 1883;
const char* mqtt_Client = "e97157c7-82cb-47af-818f-a51a7ea9412d";
const char* mqtt_username = "iNjQcUqzU7KkYZooRa2pgdxXwCLRjV46";
const char* mqtt_password = "jNC8SZNJIMe$7~*RAby)J!jVTNb4MrBm";

WiFiClient espClient;
PubSubClient client(espClient);
//DHT dht(DHTPIN, DHTTYPE);
char msg[50];

int v1 = 20, v2 = 0;

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection…");
        if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
            Serial.println("connected");
            client.subscribe("@msg/led");
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
}

void setup() {
    pinMode(LED1,OUTPUT);
    Serial.begin(115200);
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
    //dht.begin();
}

void loop() {
    //int humidity = dht.readHumidity();
    //int temperature = dht.readTemperature();
    v1 = (v1 + 5)%100;
    v2 = (v2 + 3)%100;
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    String data = "{\"data\": {\"humid\":" + String(v1) + ", \"temperature\":" + String(v2) + "}}";
    Serial.println(data);
    data.toCharArray(msg, (data.length() + 1));
    client.publish("@shadow/data/update", msg);
    delay(2000);
}
