#include <dht.h>

dht DHT;

#define DHT11_PIN 7

int measurePin = A5;
int ledPower = 12;
int temperatura = 0;
int umiditate = 0;
unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;

float RS_gas = 0;
float ratio = 0;
float sensorValue = 0;
float sensor_volt = 0;
float R0 = 7200.0;
void setup(){
  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);
}

void loop(){
  digitalWrite(ledPower,LOW);
  delayMicroseconds(samplingTime);

  voMeasured = analogRead(measurePin);

  delayMicroseconds(deltaTime);
  digitalWrite(ledPower,HIGH);
  delayMicroseconds(sleepTime);

  calcVoltage = voMeasured*(5.0/1024);
  dustDensity = 0.17*calcVoltage-0.1;

  if ( dustDensity < 0)
  {
    dustDensity = 0.00;
  }
  int chk = DHT.read11(DHT11_PIN);
if((DHT.temperature>50 || DHT.temperature<0) || (DHT.humidity<0||DHT.humidity>100))
{}
else
{temperatura= DHT.temperature;
umiditate = DHT.humidity;}

  sensorValue = analogRead(A0);
   sensor_volt = sensorValue/1024*5.0;
   RS_gas = (5.0-sensor_volt)/sensor_volt;
   ratio = RS_gas/R0;
   float x = 1538.46 * ratio;
   float ppm = pow(x,-1.709);

   Serial.println(String("")+temperatura+"/"+umiditate+"/"+dustDensity+"/"+ppm+"/");
   delay(1000);

}
