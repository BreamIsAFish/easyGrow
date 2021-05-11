#include <MicroGear.h>
#include <ESP8266WiFi.h>

const char* ssid     = "dseprivate";
const char* password = "fugvlvugoH9[kpot0tU";

//#define APPID   "e97157c7-82cb-47af-818f-a51a7ea9412d"
//#define KEY     "iNjQcUqzU7KkYZooRa2pgdxXwCLRjV46"
//#define SECRET  "jNC8SZNJIMe$7~*RAby)J!jVTNb4MrBm"

//#define ALIAS   "NodeMCU1"
//#define TargetWeb "HTML_web"

//WiFiClient client;
//MicroGear microgear(client);

//void onMsghandler(char *topic, uint8_t* msg, unsigned int msglen) 
//{
//    Serial.print("Incoming message --> ");
//    msg[msglen] = '\0';
//    Serial.println((char *)msg);
//}
//
//
//void onConnected(char *attribute, uint8_t* msg, unsigned int msglen) 
//{
//    Serial.println("Connected to NETPIE...");
//    microgear.setAlias(ALIAS);
//}

void setup() 
{
     /* Event listener */
//    microgear.on(MESSAGE,onMsghandler);
//    microgear.on(CONNECTED,onConnected);

    Serial.begin(115200);
    Serial.println("Starting...");

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) 
    {
       delay(250);
       Serial.print(".");
    }

    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

//    microgear.init(KEY,SECRET,ALIAS);
//    microgear.connect(APPID);
}

void loop() 
{
//    if (microgear.connected())
//    {
//       microgear.loop();
//       Serial.println("connected");
//
//       String data = "1234";
//       char msg[128];
//       data.toCharArray(msg,data.length());
//       Serial.println(msg);    
//
//       microgear.chat(TargetWeb , msg);
//    }
//   else 
//   {
//    Serial.println("connection lost, reconnect...");
//    microgear.connect(APPID);
//   }
//    delay(1500);
}
