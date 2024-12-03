import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Make sure your Supabase client is set up

const BookingForm = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.fullname || "",
    carNumber: "",
    date: "",
    time: "",
    pricingModel: "",
  });
  const [bookings, setBookings] = useState([]); // State to store user's bookings

  const pricingModels = [
    { name: "ONE - HOUR", price: 59, aosDelay: "0" },
    { name: "THREE - HOUR", price: 129, aosDelay: "500" },
    { name: "FULL - DAY", price: 299, aosDelay: "1000" },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings") // Replace with your bookings table name
      .select("*")
      .eq("user_id", user.id); // Fetch bookings for the logged-in user

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data); // Update bookings state
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const { carNumber, date, time, pricingModel } = formData;
  //   const selectedPricing = pricingModels.find((model) => model.name === pricingModel);
  //   const price = selectedPricing?.price || 0;
  
  //   const createdAt = new Date().toISOString(); // Current timestamp in ISO format
  
  //   const { error } = await supabase
  //     .from("bookings")
  //     .insert([
  //       {
  //         user_id: user.id,
  //         car_number: carNumber,
  //         date,
  //         time,
  //         pricing_model: pricingModel,
  //         price,
  //         created_at: createdAt, // Add the current timestamp
  //       },
  //     ]);
  
  //   if (error) {
  //     console.error("Error inserting booking:", error);
  //     alert("There was an error while booking the slot.");
  //   } else {
  //     alert("Slot booked successfully!");
  //     await fetchBookings(); // Refresh bookings
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { carNumber, date, time, pricingModel } = formData;
    const selectedPricing = pricingModels.find((model) => model.name === pricingModel);
    const price = selectedPricing?.price || 0;
  
    const createdAt = new Date().toISOString(); // Current timestamp in ISO format
  
    // Insert booking into the database
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          car_number: carNumber,
          date,
          time,
          pricing_model: pricingModel,
          price,
          created_at: createdAt,
        },
      ]);
  
    if (error) {
      console.error("Error inserting booking:", error);
      alert("There was an error while booking the slot.");
      return;
    }
  
    // Call API to send SMS
    try {
      const response = await fetch("/api/sendBookingSms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber:"7597372851", // User's phone number from metadata
          message: 
      `
      SMARTPARKING 
🚗 Booking Confirmed 🚗
━━━━━━━━━━━━━━━━━━━━
🆔 Car Number: ${carNumber}  
📅 Date: ${date}  
⏰ Time: ${time}  
💳 Pricing Model: ${pricingModel}  
💰 Price: ₹${price}  
━━━━━━━━━━━━━━━━━━━━
Thank you for choosing us! Have a great day! 🎉
`,
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Slot booked and SMS sent successfully!");
      }
       else {
        console.error("SMS API Error:", result.error);
        alert("Booking successful, but SMS could not be sent.");
      }
    } catch (smsError) {
      console.error("Error sending SMS:", smsError);
      alert("Booking successful, but SMS could not be sent.");
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6 sm:px-12" id="booking">
      <h1 className="text-3xl font-bold text-center mb-6">Book a Parking Slot</h1>
      <form
        className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Car Number
          </label>
          <input
            type="text"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleInputChange}
            className="border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
            Parking Pricings
          </label>
          <select
            name="pricingModel"
            value={formData.pricingModel}
            onChange={handleInputChange}
            className="border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="" disabled>
              Select a pricing model
            </option>
            {pricingModels.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name} - ₹{model.price}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded font-semibold hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Book Slot
          </button>
        </div>
      </form>

      {/* Orders Section */}
      <div className="mt-10">
  <h2 className="text-2xl font-bold text-center mb-4">Your Orders</h2>
  {bookings.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 rounded shadow-md dark:bg-gray-800 dark:text-white"
        >
          <p><strong>Booking Date:</strong> {new Date(booking.created_at).toISOString().split("T")[0]}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Car Number:</strong> {booking.car_number}</p>
          <p><strong>Parking Hour:</strong> {booking.pricing_model}</p>
          <p><strong>Price:</strong> ₹{booking.price}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-700 dark:text-gray-200">
      No bookings found.
    </p>
  )}
</div>
    </div>
  );
};

export default BookingForm;


// Car Number: ${carNumber}, 
//           Date: ${date}, 
//           Time: ${time}, 
//           Pricing: ${pricingModel} - ₹${price}