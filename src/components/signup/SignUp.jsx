import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import BookingForm from "../BookingForm/BookingForm";

function SignUp({ setToken ,setUser, theme }) {
  const navigate = useNavigate();

  // State management
  const [formType, setFormType] = useState("login"); // "login" or "signup"
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phno: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [formLoading, setFormLoading] = useState(false); 


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); 
  }, [theme]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setToken(session);
        navigate("/booking"); 
      }
    };

    fetchSession();
    return () => clearTimeout(timer);
  }, [navigate, setToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage(null);
    setErrorMessage(null);

    const { fullname, email, phno, password } = formData;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullname, phno },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setMessage("Signup successful! Please check your email to confirm your account.");
        
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage(null);
    setErrorMessage(null);
  
    const { email, password } = formData;
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setErrorMessage("Invalid email or password.");
      } else {
        setUser(data.user);
        setToken(data);
        navigate("/booking"); 
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setFormLoading(false);
    }
  };
  
  const switchFormType = (type) => {
    setFormType(type);
    setMessage(null);
    setErrorMessage(null);
    setFormData({
      fullname: "",
      email: "",
      phno: "",
      password: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return ( 
    <div className="frm ">
    <div className="form-container ">
      <h2 className="form-title">{formType === "login" ? "Login" : "Signup"}</h2>
      {message && <p className="message success">{message}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}

      {formLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="loader w-16 h-16 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={formType === "login" ? handleLogin : handleSignup}>
          {formType === "signup" && (
            <>
              <div className="input-group">
                <label>Fullname</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            {formType === "login" ? "Login" : "Signup"}
          </button>
        </form>
      )}

      <div className="form-switch">
        {formType === "login" ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => switchFormType("signup")} className="switch-button">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => switchFormType("login")} className="switch-button">
              Log in
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}


export default SignUp;