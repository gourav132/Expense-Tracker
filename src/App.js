import { AuthHome } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAnalytics from "./Pages/Analytics/Analytics";
import AuthHomePage from "./Pages/Home/Home";
import AuthExpensePage from "./Pages/Expenses/Expenses";

function App() {
  return (
    <div className="dark:bg-black bg-white transition-colors duration-300 ease-in-out h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthHomePage />} />
          <Route path="/Exp" element={<AuthExpensePage />} />
          <Route path="/Analytics" element={<AuthAnalytics />} />
          <Route path="/Auth" element={<AuthHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
