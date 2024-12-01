import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Prices from "./components/Prices/Prices";
import Availability from "./components/Availability/Availability";
import Footer from "./components/Footer/Footer";
import BookingForm from "./components/BookingForm/BookingForm";
import SignUp from "./components/signup/signup";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  const [user, setUser] = useState(null); // Track logged-in user
  const [token, setToken] = useState(null);
  useEffect(() => {
    // Check if a user is already logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // Scroll to Top functionality
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    useEffect(() => {
      // Fetch user session and set user state accordingly
      const fetchSession = async () => {
        const { data: { user } } = await supabase.auth.getSession();
        setUser(user); // Set user data from session
      };
    
      fetchSession();
    
      // Listen for session changes
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          setUser(session.user); // Update user state on session change
        } else {
          setUser(null); // Reset user if no session
        }
      });
    
      // Cleanup listener on unmount
      return () => {
        listener?.unsubscribe();
      };
    }, []);
    
  };

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Navbar theme={theme} setTheme={setTheme} user={user} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} setToken={setToken} theme={theme} />} />
          <Route
            path="/booking"
            element={user ? <BookingForm user={user} /> : <Navigate to="/signup" />}
          />
        </Routes>
        <Footer />
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 w-10 h-10 right-5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition duration-300"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
    </Router>
  );
};

const Home = ({ theme }) => (
  <>
    <Hero theme={theme}/>
    <Availability theme={theme} />
    <About />
    <Services theme={theme} />
    <Prices />
  </>
);

export default App;
