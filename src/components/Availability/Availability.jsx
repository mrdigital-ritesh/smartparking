import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { supabase } from '../../supabaseClient'; 
import pattern from '../../assets/website/pattern.jpeg';
import dark1 from '../../assets/website/dark1.jpg';

const Availability = ({ theme }) => {
  const [slots, setSlots] = useState(null); 
  const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };



  useEffect(() => {
    const fetchSlots = async () => {
      const { data: sdata, error } = await supabase
        .from('slot')
        .select('data')
        .eq('id', 1);
    
      if (error) {
        console.error('Error fetching slots:', error.message);
        setSlots(0);
      } else if (sdata?.length > 0) {
        console.log('Fetched data:', sdata);
        setSlots(sdata[0].data);
      } else {
        console.warn('No data found for the specified query.');
        setSlots(0); 
      }
    };
    

    fetchSlots();

    const subscription = supabase
      .channel('realtime:slot')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'slot' },
        (payload) => {
          console.log('Real-time payload:', payload);
          setSlots(payload.new.data); // Update slots on change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="container" id = "availability">
      <div
        className={`mt-3  py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        style={{
          backgroundImage: `url(${theme === "dark" ? dark1 : pattern})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          
        }}
      >
        <div>
          <div className="space-y-7 max-w-xxxl mx-auto">
            <h1
              data-aos="fade-up"
              className="text-2xl text-center sm:text-4xl font-semibold font-serif"
            >
              PARKING SLOT AVAILABILITY
            </h1>
            <p data-aos="fade-up" className="text-4xl text-center sm:px-20">
              Slots Available: {slots !== null ? slots : 'Loading...'}
            </p>

            <div className="grid place-items-center mt-8">
          <button
            data-aos="fade-up"
            className={`${
          theme === "dark" ? "button-outline" : "button-outlinedark"
        }`}
           onClick={Openbooking} 
          >
            BOOK NOW!
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
