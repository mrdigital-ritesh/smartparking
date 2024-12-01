import React, { useEffect, useState } from "react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import { supabase } from "../../supabaseClient"; // Assuming you use supabase for user auth
import { Link, useNavigate} from 'react-router-dom';


const Hero = ({ theme }) => {
  const [user, setUser] = useState(null);

  // Fetch the user data from Supabase (or wherever you store it)
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    AOS.init(); // Initialize AOS once

    return () => {
      // Clean up if necessary
    };
  }, []);

  const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };
  return (
    <div className="dark:bg-black dark:text-white duration-300">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt="Car image"
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Welcome, {user ? user?.user_metadata?.fullname : "User"}!
            </p>

            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              SMART PARKING
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
            Revolutionizing Parking with Innovation and Efficiency<br></br>

An Automated Smart Parking System was developed by Ritesh Bagdi and Abhishek Sharma, final-year BCA students at Dezyne Ecole College, Ajmer. This innovative system leverages cutting-edge RFID, IoT technologies, and Arduino to streamline parking management, ensuring a seamless, user-friendly experience for both drivers and operators.


            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="300"
              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
              onClick={Openbooking}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
