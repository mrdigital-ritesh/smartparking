#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Servo.h>
#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9
#define SS_PIN 10

LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myservo;

MFRC522 mfrc522(SS_PIN, RST_PIN);
int IR1 = 2;
int IR2 = 3;

int red = 7;
int green = 6;
int buzz = 8;

int Slot = 4;
int previousSlot = 0;

int flag1 = 0;

int flag2 = 0;

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();


  pinMode(red, 1);
  pinMode(green, 1);
  pinMode(buzz, 1);
  pinMode(IR1, INPUT);

  pinMode(IR2, INPUT);
  myservo.attach(4);
  myservo.write(100);

  SPI.begin();
  mfrc522.PCD_Init();
  lcd.setCursor(0, 0);
  lcd.print("   SMART PARK   ");
  lcd.setCursor(0, 1);
  lcd.print(" SYSTEM READY!  ");
  delay(2000);
  lcd.clear();
}

void loop() {
  // Entry logic


  if (digitalRead(IR1) == LOW && flag1 == 0 && flag2 == 0) {

    if (Slot > 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("SCANNING CARD..");
      delay(2000);

      if (readRFID()) {
        flag1 = 1;

        if (flag2 == 0) {
          myservo.write(0);

          Slot = Slot - 1;
        }
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Access Granted!");
        lcd.setCursor(0, 1);
        lcd.print("Go Ahead...");

        digitalWrite(green, 1);
        digitalWrite(buzz, 1);
        delay(2000);
        digitalWrite(green, 0);
        digitalWrite(buzz, 0);
      }

    } else {

      lcd.clear();
      lcd.setCursor(0, 0);

      lcd.print("    SORRY :(    ");

      lcd.setCursor(0, 1);

      lcd.print("  Parking Full  ");

      delay(3000);
      lcd.setCursor(0, 1);

      lcd.print("                ");
    }
  }



  if (digitalRead(IR2) == LOW && flag2 == 0) {
    flag2 = 1;

    if (flag1 == 0) {
      myservo.write(0);

      Slot = Slot + 1;
    }
  }



  if (flag1 == 1 && flag2 == 1) {

    delay(1000);

    myservo.write(100);

    flag1 = 0, flag2 = 0;
  }
  if (digitalRead(IR1) == LOW && flag2 == 1 && flag1 == 0) {

    delay(1000);

    myservo.write(100);

    flag1 = 0, flag2 = 0;
  }


   if (Slot != previousSlot) {
        Serial.println(Slot);
        previousSlot = Slot;  // Update the previousSlot variable
      }
  lcd.setCursor(0, 0);
  lcd.print("    WELCOME!    ");
  lcd.setCursor(0, 1);
  lcd.print("Slot Left: ");
  lcd.print(Slot);
  delay(500);
}

bool readRFID() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return false;
  }
  if (!mfrc522.PICC_ReadCardSerial()) {
    return false;
  }

  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();

  //Serial.print("Card UID: ");
  //Serial.println(content);


  if (content == "A3CA05E3") {
    //Serial.println("RFID Authorized");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Access Granted!");
    return true;
  } else {
    //Serial.println("RFID Denied");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Access Denied!");
    lcd.setCursor(0, 1);
    lcd.print("Invalid RFID");

    digitalWrite(red, 1);
    digitalWrite(buzz, 1);

    delay(200);
    digitalWrite(red, 0);
    digitalWrite(buzz, 0);

    delay(200);

    digitalWrite(red, 1);
    digitalWrite(buzz, 1);
    delay(200);
    digitalWrite(buzz, 0);
    digitalWrite(red, 0);
    delay(200);

    digitalWrite(red, 1);
    digitalWrite(buzz, 1);
    delay(200);
    digitalWrite(red, 0);
    digitalWrite(buzz, 0);

    delay(2000);
    return false;
  }
}
