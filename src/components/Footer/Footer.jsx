import React from "react";
import { HashLink } from "react-router-hash-link";  // Import HashLink for hash-based navigation
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",  // Hash-based link
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Availability",
    link: "/#availability",
  },
  {
    title: "Booking",
    link: "/booking",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
      <section className="container">
        <div className="grid md:grid-cols-3 py-5">
          {/* Company Details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
            Smart Parking, Anytime, Anywhere!
            
            </h1>
            <p className="text-sm">
            Experience the convenience of smart parking at your fingertips. Available 24/7 with easy access via our website and app.
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Ajmer, Rajasthan</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+91 7597372851</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 col-span-2 md:pl-10">
            <div className="">
              <div className="py-8 px-2">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {FooterLinks.map((link, index) => (
                    <li key={index} className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200">
                      <HashLink to={link.link}> {/* Use HashLink for hash-based routing */}
                        <span>&#11162;</span>
                        <span>{link.title}</span>
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="">
              <div className="py-8 pr-6">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Location
                </h1>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {/* Responsive iframe */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.4641464431193!2d74.63801467442423!3d26.472996478850746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6ffe433b423%3A0x843c7c35e58c516!2sDezyne%20E&#39;cole%20College!5e0!3m2!1sen!2sin!4v1732949391522!5m2!1sen!2sin"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="footer mt-5">
        <h1 className="mt-1 ml-12 text-lg font-semibold whitespace-nowrap text-ellipsis drop-shadow-lg">
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
        </div>
        
      </section>
    </div>
  );
};

export default Footer;
