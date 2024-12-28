import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [user, setUser] = useState();
  const [authLoading, setAuthLoading] = useState(true);
  console.log("context page - ", cookies.jwt);
  console.log(window.location.hostname);
  useEffect(() => {
    setAuthLoading(true);
    const checkToken = async () => {
      if (cookies.jwt) {
        try {
          const response = await axios.post(
            "https://vle-server.onrender.com/auth/checkAuth",
            // "http://localhost:4242/auth/checkAuth",
            {
              token: cookies.jwt,
            }
          );

          setUser({ ...response.data.user, token: cookies.jwt });
          setAuthLoading(false);
        } catch (err) {
          console.log(err.response.data.error);
          setAuthLoading(false);
        }
      }
    };
    checkToken();
  }, [cookies]);

  const logout = () => {
    setUser(null);
    removeCookie("jwt");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
