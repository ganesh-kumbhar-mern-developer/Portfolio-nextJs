"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import ToastProvider from "@/components/toaster/ToastProvider.jsx";
import JsonLdSchemas from "@/components/seo/JsonLdSchemas.jsx";
import { NavbarProvider } from "@/context/NavbarContext.jsx";

export default function LayoutClient({ children }) {
  const [mounted, setMounted] = useState(false);

  // On mount: set dark mode and mounted state
  useEffect(() => {
    setMounted(true);
    // Force dark mode and save to localStorage
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  // Wake backend (Render) server
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get(
          "https://portfolio-form-backend-t69y.onrender.com/api/wake-up"
        );
      } catch (e) {}
    };
    wakeServer();
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <NavbarProvider>
      <JsonLdSchemas />
      <ToastProvider />
      <Navbar />
      {children}
      <Footer />
    </NavbarProvider>
  );
}
