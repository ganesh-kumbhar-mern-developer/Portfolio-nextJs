"use client";
import { useState, useEffect } from "react";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Heart,
  Code,
  Coffee,
} from "lucide-react";
import ContactPopUpForm from "../forms/ContactPopUpForm.jsx";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ganesh-kumbhar-mern-developer",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/ganesh-kumbhar-mern-developer",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com/ganesh_kumbhar_211",
      color: "hover:text-pink-500",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://facebook.com/ganeshkumbhar211",
      color: "hover:text-blue-600",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "ganeshhh2003@gmail.com",
      href: "mailto:ganeshhh2003@gmail.com",
    },
    {
      icon: Phone,
      text: "+91 9096378354",
      href: "tel:+919096378354",
    },
    {
      icon: MapPin,
      text: "ShivajiNagar, Pune, Maharashtra 411004",
      href: "#",
    },
  ];

  return (
    <>
      <footer className="footer relative bg-black text-white overflow-hidden pt-10">
        {/* Static Background Decorations */}
        <div
          className="absolute -top-80 -left-80 w-[900px] h-[900px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgb(117, 78, 249) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-80 -right-80 w-[900px] h-[900px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgb(117, 78, 249) 0%, transparent 70%)",
          }}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">
          <div className="absolute top-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  Ganesh Kumbhar
                </h3>
                <p className="text-gray-300 text-lg font-medium mb-4">
                  Fullstack Developer
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Passionate about building scalable web applications using
                  modern JavaScript frameworks. Always learning, always growing.
                </p>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {["React", "Next.js", "Node.js", "MongoDB", "TypeScript"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 hover:border-purple-400/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4" />
                </div>
                Get In Touch
              </h4>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    target="_blank"
                    href={item.href}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links & CTA */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                  <ExternalLink className="w-4 h-4" />
                </div>
                Connect With Me
              </h4>

              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    target="_blank"
                    href={social.href}
                    className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:border hover:border-purple-500/30`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 cursor-pointer"
                onClick={() => setIsContactPopupOpen(true)}
              >
                <Mail className="w-5 h-5 mr-2" />
                Let's Connect
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
              <span>and</span>
              <Coffee className="w-4 h-4 mx-2 text-amber-500" />
              <span>by Ganesh Kumbhar</span>
            </div>

            <p className="text-gray-400 text-sm flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Copyright &copy; {currentYear} | gktechhub.com | All rights
              reserved
            </p>
          </div>
        </div>
      </footer>

      <ContactPopUpForm
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </>
  );
};

export default Footer;
