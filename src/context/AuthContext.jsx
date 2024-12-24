import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies([]);
  const [user, setUser] = useState(cookies.jwt);

  useEffect(() => {
    console.log("Value of User Context", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
