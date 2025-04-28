import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Subscribe from "./pages/Subscribe";
import Dashboard from "./pages/Dashboard";
import ThankYou from "./pages/ThankYou";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Legal from "./pages/Legal";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Router>
      <div className={theme === "dark" ? "min-h-screen bg-togglex-black text-white" : "min-h-screen bg-white text-black"}>
        <Navbar />
        <div className="flex justify-end px-4">
          <button
            onClick={toggleTheme}
            className={theme === "dark" ? "bg-togglex-yellow text-black px-3 py-1 rounded mt-2" : "bg-black text-togglex-yellow px-3 py-1 rounded mt-2"}
          >
            {theme === "dark" ? "Thème clair" : "Thème sombre"}
          </button>
        </div>
        <Toaster position="top-right" />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/subscribe/:planName" element={<Subscribe />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 