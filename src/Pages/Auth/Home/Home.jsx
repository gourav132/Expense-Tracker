import React, { useState, useEffect } from "react";
import { Navbar } from "../../../Components";
import { Register, Login } from "../../index";
import { AnimatePresence } from "framer-motion";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies] = useCookies([]);
  useEffect(() => {
    console.log("Auth cookie", cookies);
  }, [cookies]);

  const [login, setLogin] = useState(true);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Navbar />
      <AnimatePresence mode="wait">
        {login ? (
          <Login key="login" setLogin={setLogin} />
        ) : (
          <Register key="register" setLogin={setLogin} />
        )}
      </AnimatePresence>
    </div>
  );
}
