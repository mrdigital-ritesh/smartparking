import React from "react";
import whiteCar from "../../assets/white-car.png";
import car6 from "../../assets/car6.png";
import car3 from "../../assets/car3.png";
import { Link, useNavigate} from 'react-router-dom';


const prices = [
  {
    name: "ONE - HOUR",
    price: 59,
    image: car3,
    aosDelay: "0",
  },
  {
    name: "THREE - HOUR",
    price: 129,
    image: car6,
    aosDelay: "500",
  },
  {
    name: "FULL - DAY",
    price: 299,
    image: whiteCar,
    aosDelay: "1000",
  },
];

const Prices = () => {
  // Function to handle scroll to Availability
  const handleScrollToAvailability = () => {
    const availabilitySection = document.getElementById("availability");
    if (availabilitySection) {
      availabilitySection.scrollIntoView({ behavior: "smooth" });
    }

      const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };
  };
  const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };

  return (
    <div className="pb-24" id="prices">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Parking Pricings
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
          Book a best space to park your daily drive....
        </p>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {prices.map((data) => (
              <div
                key={data.name}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>₹{data.price} </p>
                    <button 
           onClick={Openbooking} 
           > <a href="#">BOOK SLOT</a></button>
                   
                  </div>
                </div>
                <p className="text-m font-semibold absolute top-0 left-3">
                  Parking
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button
            data-aos="fade-up"
            className="button-outline"
            onClick={handleScrollToAvailability} // Attach the scroll function
          >
            CHECK AVAILABILITY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prices;
