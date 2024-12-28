import React, { useState, useEffect } from "react";
import { Navbar } from "../../../Components";
import { Register, Login } from "../../index";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";

export default function Home() {
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [login, setLogin] = useState(true);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {authLoading ? (
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="puff-loading"
        />
      ) : (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            {login ? (
              <Login key="login" setLogin={setLogin} />
            ) : (
              <Register key="register" setLogin={setLogin} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
