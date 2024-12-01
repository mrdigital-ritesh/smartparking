import React from "react";
import { FaAppStore, FaCameraRetro, FaCarSide, FaCashRegister, FaMoneyBill, FaParking, FaSearchLocation, FaTimes } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";
import { Link, useNavigate} from 'react-router-dom';


const skillsData = [
  {
    name: "RFID-Based Access & Gate Control",
    icon: (
      <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Our system uses RFID technology to automatically open gates as you approach, offering a smooth entry and exit experience without the need for physical tickets or manual intervention",
    aosDelay: "0",
  },
  {
    name: "Online Slot Booking",
    icon: (
      <FaParking className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "sers can check real-time parking slot availability and reserve a spot in advance, ensuring they always have a place to park upon arrival. This feature helps reduce search time and traffic congestion.",
    aosDelay: "400",
  },
  {
    name: "Real-Time Slot Availability",
    icon: (
      <FaSearchLocation className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "The system displays current parking slot availability, giving users the ability to view available parking slots. This helps optimize parking lot usage and saves time",
    aosDelay: "500",
  },
  {
    name: "Secure & Cashless Transactions:",
    icon: (
      <FaMoneyBill className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Our secure, cashless payment systems allow for quick and hassle-free parking fee transactions, with the option for users to pay via the app ",
    aosDelay: "600",
  },
];
const Services = () => {

  const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };
  return (
    <>
      <span id="services"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <button onClick={Openbooking}>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  Get Started
                </a>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
