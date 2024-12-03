import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate} from 'react-router-dom';

import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, setShowMenu, user, theme, setTheme, handleLogout }) => {
  // Handle the menu toggle
  const handleMenuClick = () => {
    setShowMenu(false); // Hide the menu when an option is clicked
  };
  const navigate = useNavigate();


  const Openbooking  =()=> {
   
        navigate("/booking"); // Redirect to the booking page immediately}
  };
  // Function to toggle theme
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Update theme state in parent
    document.documentElement.classList.toggle("dark", newTheme === "dark"); // Toggle dark mode class
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-6 pb-6 pt-10 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      {/* User Info */}
      <div className="card">
  <div className="flex items-center justify-start gap-2 w-full">
   <a onClick={() => {
              Openbooking();
              handleMenuClick(); // Close menu after logout
            }} > <FaUserCircle size={50} />  </a>
    <div className="flex flex-col">
      <h1 className="mt-1 text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{user ? user?.user_metadata?.fullname : "Guest"}!</h1>
      <h1 className="text-sm text-slate-500">
        
        {user ? "Premium User" : "Sign up for more!"}
      </h1>
    </div>
    <button
      onClick={handleThemeToggle}
      className="p-2  bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full ml-auto"
    >
      {theme === "dark" ? (
        <span role="img" aria-label="Light Mode">
          🌞
        </span>
      ) : (
        <span role="img" aria-label="Dark Mode">
          🌙
        </span>
      )}
    </button>
  </div>


        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data, index) => (
              <li key={index}>
                <a
                  href={data.link}
                  className="mb-5 inline-block"
                  onClick={handleMenuClick} // Close the menu when clicked
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        {user && (
          <button
            onClick={() => {
              handleLogout();
              handleMenuClick(); // Close menu after logout
            }}
            className="bg-red-500 text-white w-full mt-8 py-2 px-4 rounded text-center hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="footer mt-8 drop-shadow-lg text-m font-semibold whitespace-nowrap text-ellipsis">
        <h1>
          Made with ❤ by{" "}
          <a
            href="https://www.linkedin.com/in/ritesh-bagdi-50b3b1262/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ritesh Bagdi
          </a>
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
