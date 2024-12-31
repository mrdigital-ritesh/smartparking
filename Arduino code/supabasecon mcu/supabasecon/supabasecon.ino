#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <SoftwareSerial.h>

const char* ssid = "nodemcu";
const char* password = "12341234";

const char* supabaseURL = "https://zaxflevxenilvrsspjmd.supabase.co/rest/v1/slot?id=eq.1"; 
const char* supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpheGZsZXZ4ZW5pbHZyc3Nwam1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzE0MDEsImV4cCI6MjA0ODEwNzQwMX0._kz-Ju5c0nDMeDK0OBx0y8Ilww5S5iysLk-ZqHRNIR0";

SoftwareSerial mySerial(D1, D2);

void setup() {
  Serial.begin(115200);
  mySerial.begin(9600);

  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  if (mySerial.available()) {
    String data = mySerial.readStringUntil('\r'); // Read data from UNO
    data.trim();
    Serial.println("Received: " + data);

      if (data.length() > 0) {
      // Send update to Supabase
      if (updateSupabase(data)) {
        Serial.println("Row updated successfully in Supabase.");
      } else {
        Serial.println("Failed to update row in Supabase.");
      }
    } else {
      Serial.println("Received empty data, skipping update to Supabase.");
    }
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected! Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    int retries = 0;
    while (WiFi.status() != WL_CONNECTED && retries < 20) {
      delay(500);
      Serial.print(".");
      retries++;
    }
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nReconnected to WiFi");
    } else {
      Serial.println("\nFailed to reconnect to WiFi.");
    }
  }
}

bool updateSupabase(String data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClientSecure client;


    client.setInsecure();

    http.begin(client, supabaseURL);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("apikey", supabaseKey);
    http.addHeader("Authorization", String("Bearer ") + supabaseKey);

    String payload = "{\"data\": \"" + data + "\"}";

    int httpResponseCode = http.PATCH(payload);

    // Check response
    if (httpResponseCode > 0) {
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      String response = http.getString();
      Serial.println("Response: " + response);
      http.end();
      return httpResponseCode == 200 || httpResponseCode == 204;
    } else {
      Serial.println("Error on sending PATCH: " + String(http.errorToString(httpResponseCode)));
      http.end();
      return false;
    }
  } else {
    Serial.println("WiFi not connected.");
    return false;
  }
}

