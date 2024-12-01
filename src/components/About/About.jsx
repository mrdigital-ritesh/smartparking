import React from "react";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <div
      id="about"
      className=" dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="mt-5 sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                Our Smart Parking System uses cutting-edge RFID and IoT
                technologies to provide an effortless parking experience. With
                real-time availability checks, automated fee collection, and
                online booking, we aim to make parking smarter and more
                efficient than ever.
              </p>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                This automated smart parking system was developed
                by Ritesh Bagdi and Abhishek Sharma, final-year BCA students at
                Dezyne Ecole College, Ajmer. Their innovative work integrates
                Arduino technology and Supabase for real-time data sharing,
                ensuring accurate availability of parking slots and seamless
                parking management. Smart Parking System Operates with Arduino
                Technology, using Supabase for Real time data sharing for
                Available Slots. <br></br>Revolutionizing Parking with Smart Solutions
              </p>
              <button data-aos="fade-up" className="button-outline">
                Reserve Your Slot Today!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
