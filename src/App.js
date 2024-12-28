import { Analytics, AuthHome, Expenses, Home, Login } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAnalytics from "./Pages/Analytics/Analytics";

function App() {
  return (
    <div className="dark:bg-black bg-white transition-colors duration-300 ease-in-out h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Exp" element={<Expenses />} />
          <Route path="/Analytics" element={<AuthAnalytics />} />
          <Route path="/Auth" element={<AuthHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
