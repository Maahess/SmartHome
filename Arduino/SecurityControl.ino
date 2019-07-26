#include <Keypad.h>
#include <Servo.h>
#define FLAME 12
#define buton_casa 13
#define armare_pir A0

const byte ROWS = 4;
const byte COLS = 4;
char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};
bool valoare_usa = false;

int cod = 0;
int valoare_cod;
int parametru_cod = 783;
int armare = 0;
Keypad customKeypad = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

Servo servo_incuietoare;
int pos = 0;


int smokeA5 = A5;
int sensorThreshold = 400;
int buzzer = 11;

void setup() {
  Serial.begin(9600);
  pinMode(buton_casa, INPUT);
  pinMode(FLAME, INPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(smokeA5, INPUT);
  servo_incuietoare.attach(10);
  pinMode(armare_pir,OUTPUT);
}

void loop() {

  char customKey = customKeypad.getKey();

  if (customKey)
  {
    Serial.println(customKey);
    delay(100);
    if (customKey == '0' || customKey == '1' || customKey == '2' || customKey == '3' || customKey == '6' || customKey == '4' || customKey == '5' || customKey == '7' || customKey == '7' || customKey == '8' || customKey == '9')
    { valoare_cod = customKey - '0';
      cod = cod * 10 + valoare_cod;
    }
    if (cod == parametru_cod)
    { servo_incuietoare.write(140);
      valoare_usa = true;
      delay(1000);
    }
    if (customKey == 'C')
    { servo_incuietoare.write(25);
    valoare_usa=false;
      delay(1000);
      cod = 0;
    }
    if (customKey == 'D')
      cod = 0;
    if (customKey == 'A')
      armare = 1;
    if (customKey == 'B')
      armare = 0;

  }
  if(armare==0)
    analogWrite(armare_pir,0);
    else if(armare==1)
    analogWrite(armare_pir,255);
  int ok=digitalRead(buton_casa);
    if (ok == HIGH && valoare_usa == true)
      {servo_incuietoare.write(25);
      valoare_usa=false;
      Serial.print("Da");}
    else if (ok == HIGH && valoare_usa == false)
      {servo_incuietoare.write(140);
      valoare_usa=true;
      Serial.print("NU");}

  int analogSensor = analogRead(smokeA5);

  Serial.print("Pin A5: ");
  Serial.println(analogSensor);

  if (analogSensor > sensorThreshold)
  {servo_incuietoare.write(140);
  delay(100);
    tone(buzzer, 1000, 200);
  }
  else
  {
    noTone(buzzer);
  }
  delay(100);
  int fire = digitalRead(FLAME);
 Serial.println(fire);
  if ( fire == HIGH)
  {servo_incuietoare.write(140);
  delay(100);
    tone(buzzer, 65000, 200);
    Serial.println("Fire! Fire!");
  } else {
    noTone(buzzer);
    Serial.println("Peace");


  }



  delay(200);



}
