#include <Ethernet.h>
#define pin_lm35 A0
#define pin_led 2

byte mac[] = {
  0xDE,
  0xAD,
  0xBE,
  0xEF,
  0xFE,
  0xED
};

byte ip[] = {
  192,
  168,
  0,
  80
};
byte gateway[] = {192, 168, 0, 1};
byte subnet[] = {255, 255, 255, 0};

String readString;
EthernetServer server(80);
int statusLED = 0;

float maxTemp = 1;
float minTemp = 100;

void setup() {
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
  Serial.begin(9600);
  pinMode(pin_lm35, INPUT);
  pinMode(pin_led, OUTPUT);

  digitalWrite(pin_led, LOW);
}
void loop() { 
  EthernetClient client = server.available();
  Serial.println(lertemperatura());
  
  if (client) {  
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (readString.length() < 100) {
          readString += c;
        }

        if (c == '\n') {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json; charset=utf-8");
          client.println("Server: Arduino");
          client.println("Connnection: close");
          client.println();
          client.println("{");
          client.print("\"temperatura\": \"");
          client.print(lertemperatura());
          client.print("\",");
          client.print("\"temperatura-max\": \"");
          client.print(maxTemp);
          client.print("\",");
          client.print("\"temperatura-min\": \"");
          client.print(minTemp);
          client.println("\",");
          client.print("\"status-led\": \"");
          client.print(statusLED);
          client.println("\"");
          client.println("}");
          delay(1);
          client.stop();
          if (readString.indexOf("turnOn") > 0)
          {
            digitalWrite(pin_led, HIGH);
            Serial.println("Led On");
            statusLED = 1;
          }
          if (readString.indexOf("turnOff") > 0)
          {
            digitalWrite(pin_led, LOW);
            Serial.println("Led Off");
            statusLED = 0;
          }
          readString = "";
        }
      }
    }
  }
}
float lertemperatura() {
  float valor_analog_lm35 = float(analogRead(pin_lm35));
  float tensao = (valor_analog_lm35 * 5) / 1023;
  float temperatura = tensao / 0.010; 
  
  if(temperatura > maxTemp){
   maxTemp = temperatura; 
  }
  if(temperatura < minTemp){
   minTemp = temperatura;  
  }
  
  return temperatura;
}
