import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaBars } from "react-icons/fa";

import Button from "../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-2xl"
        >
          <FaHeartbeat className="text-3xl" />
          <span>CliniSense AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-medium">
          <a href="#home" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#workflow" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="#statistics" className="hover:text-blue-600 transition">
            Statistics
          </a>

          <a href="#testimonials" className="hover:text-blue-600 transition">
            Testimonials
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>

              <Button
                variant="danger"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden text-2xl text-blue-600"
          aria-label="Open Menu"
        >
          <FaBars />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;