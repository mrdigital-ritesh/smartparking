# Smart Parking Project

## Identity Exhibition 2024 – Dezyne Ecole College, Ajmer  

### Developed By: Ritesh Bagdi  

---

## Project Overview  

The **Smart Parking Project** is an innovative solution designed to streamline parking management using modern web, mobile, and hardware technologies. This system provides real-time updates on parking slot availability, secure gate access, and booking confirmation through automated messaging, making it user-friendly and efficient.  

---

## Features  

### Web and Mobile Application  
- **Developed Using**: React (Web) and Progressive Web Application (PWA) technologies.  
- **Deployed**: Hosted on **Vercel** for web access and installable as a mobile app.  
- **PWA Integration**: Chrome install option for a seamless mobile experience.  

### Database and Authentication  
- **Database**: Supabase for real-time parking slot updates.  
- **Authentication**: Secure user login and management through Supabase.  

### Hardware Integration  
- **Working Model**: Built using Arduino and NodeMCU.  
- **Access Control**: RFID-based gate access system.  
- **Slot Detection**: IR sensors integrated with servo motors for automated control.  

### Communication  
- **Twilio API**: Sends booking confirmation messages to users for a secure and reliable experience.  

---

## How It Works  

1. **User Login**: Users authenticate via the web or PWA app.  
2. **Slot Booking**: Users view real-time slot availability and book their preferred slot.  
3. **Confirmation**: Twilio API sends an SMS confirming the booking.  
4. **Gate Access**: RFID cards are used for entry; IR sensors and servo motors ensure automated access control.  
5. **Real-Time Updates**: The Supabase database keeps the app updated with the current parking status.  

---

## Technology Stack  

- **Frontend**: React.js, PWA  
- **Backend**: NodeMCU, Arduino  
- **Database**: Supabase (Real-time updates and authentication)  
- **API Integration**: Twilio for SMS notifications  
- **Hardware**: RFID, IR sensors, servo motors  

---

## Setup and Installation  

1. **Clone the repository** and navigate to the project directory.  
2. **Install dependencies**:  
   ```bash
   npm install
## Start the development server:
npm run dev
Configure Supabase and Twilio API keys in the .env file.
Deploy the app on Vercel for production use.

# Acknowledgments
## Dezyne Ecole College, Ajmer for hosting the Identity Exhibition 2024.
## All mentors and peers who supported the development of this project.

# Contact
For inquiries or further development details, reach out to:
## Ritesh Bagdi
Email: official.ritesh21@gmail.com
