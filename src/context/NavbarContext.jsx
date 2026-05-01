"use client";

import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [activeSection, setActiveSection] = useState("home");
  const [sectionRefs, setSectionRefs] = useState({});
  const [targetSection, setTargetSection] = useState(null);

  return (
    <NavbarContext.Provider value={{ activeSection, setActiveSection, sectionRefs, setSectionRefs, targetSection, setTargetSection }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within NavbarProvider");
  }
  return context;
}
