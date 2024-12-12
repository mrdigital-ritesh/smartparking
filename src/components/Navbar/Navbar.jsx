import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { supabase } from "../../supabaseClient"; 
import ResponsiveMenu from "./ResponsiveMenu";

export const Navlinks = [
  { id: 1, name: "HOME", link: "/#" },
  { id: 2, name: "ABOUT", link: "/#about" },
  { id: 3, name: "AVAILABILITY", link: "/#availability" },
  { id: 4, name: "SERVICES", link: "/#services" },
  { id: 5, name: "PRICES", link: "/#prices" },
  { id: 6, name: "BOOKING", link: "/booking" },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">SMART PARKING</span>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  {link.startsWith("/#") ? (
                    <HashLink
                      smooth
                      to={link}
                      className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </HashLink>
                  ) : (
                    <Link
                      to={link}
                      className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Logout
                </button>
              )}
            </ul>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <HiMenuAlt1
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>

      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} user={user}  handleLogout={handleLogout}  theme={theme} // Pass theme prop
  setTheme={setTheme}  />
    </div>
  );
};

export default Navbar;
