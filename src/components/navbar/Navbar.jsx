"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Award,
  FolderOpen,
  Code,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "about", label: "About", icon: User },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Code },
  { key: "certifications", label: "Certifications", icon: Award },
  { key: "projects", label: "Projects", icon: FolderOpen },
  { key: "contact", label: "Contact", icon: Mail },
];

const Navbar = ({ activeSection, sectionRefs }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsSticky(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = useCallback(
    (sectionKey) => {
      const sectionRef = sectionRefs[sectionKey];
      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setMenuOpen(false);
      }
    },
    [sectionRefs]
  );

  return (
    <header
      className="header fixed top-0 left-0 right-0 z-50 transition-colors duration-300
        bg-black/95
        border-b border-purple-500/20
        shadow-2xl shadow-purple-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick("home")}
            className="logo flex items-center space-x-2 cursor-pointer select-none"
          >
            <div className="font-bold text-xl">
              <Image src="/logo2.png" width={200} height={100} alt="Logo" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar hidden lg:flex items-center space-x-1">
            {navItems.map(({ key, label, icon: Icon }) => {
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer select-none transition-colors duration-300
                    ${
                      isActive
                        ? "text-white border-b-2 border-purple-500"
                        : "text-purple-300 hover:text-white"
                    }`}
                  type="button"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden p-3 rounded-full transition-colors duration-300
              bg-gradient-to-r from-purple-600 to-purple-500
              border border-purple-700"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className="lg:hidden backdrop-blur-xl
            bg-black/95
            border-t border-purple-500/20"
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map(({ key, label, icon: Icon }) => {
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl select-none transition-colors duration-300
                    ${
                      isActive
                        ? "text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/25"
                        : "text-purple-300 hover:text-white hover:bg-purple-700/20"
                    }`}
                  type="button"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Gradient Border Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"
        initial={false}
        animate={{ scaleX: isSticky ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "center" }}
      />
    </header>
  );
};

export default Navbar;
