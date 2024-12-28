import React, { useState, useEffect } from "react";
import axios from "axios";
import { InformationCard, Navbar, ExpenseTable } from "../../Components";
import withAuth from "../../hoc/withAuth";

function Analytics() {
  return (
    <div className="relative flex h-screen w-full gap-10 justify-center items-center">
      <Navbar />

      <p className="text-3xl dark:text-white">Testing Page</p>
    </div>
  );
}

const AuthAnalytics = withAuth(Analytics);

export default AuthAnalytics;
