"use client";

import { useState, useEffect, useRef } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Mail,
  ArrowRight,
  Sparkles,
  ArrowBigDown,
  ArrowDown,
} from "lucide-react";
import { AnimatedBackground } from "@/components/skills/AnimatedBackground";
import PopUpForm from "@/components/forms/PopUpForm";

const roles = [
  "MERN Stack Developer",
  "React.js Developer",
  "Next.js Developer",
  "Full Stack Web Developer",
  "Frontend Engineer",
  "Performance-Focused UI Developer",
  "React.js, Next.js, Node.js Expert"
];

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(
      () => setCurrentRole((prev) => (prev + 1) % roles.length),
      3000
    );
    return () => clearInterval(id);
  }, [isInView]);

  const handleDownloadClick = () => {
    setIsFormOpen(true);
  };
  const handleViewProjectsClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-auto bg-gradient-to-b from-black via-[#0a0515] to-black overflow-hidden flex items-center"
    >
      <AnimatedBackground />

      <div className="container mx-auto px-4 sm:px-8 py-16 lg:py-24 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Content */}
          <div
            className="space-y-8 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Main Heading */}
            <div className="space-y-6">
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300 bg-clip-text text-transparent">
                  Transforming Ideas
                </span>
                <span className="block bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300 bg-clip-text text-transparent">
                  Into Fast,
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                  Modern Digital Experiences
                </span>
              </h3>

              {/* Subtitle with Rotating Role */}
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-white text-xl font-semibold">
                  Ganesh Kumbhar – MERN Stack Developer | React.js, Next.js, Node.js Expert
                </h1>
                <div className="h-2 flex items-center m-6">
                  <h2 className="text-3xl font-bold sm:text-5xl text-purple-300 transition-all duration-500 inline-block">
                    {roles[currentRole]}
                  </h2>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed font-light">
              Crafting{" "}
              <span className="text-purple-300 font-medium">
                performant, accessible, and beautiful interfaces
              </span>{" "}
              using React, Next.js, Node.js, and modern web technologies. I
              specialize in building production-ready applications that users
              love.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={handleDownloadClick}
                className="group relative px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 flex items-center justify-between gap-2"
              >
                <span>Download Resume</span>
                <ArrowDown className="absolute right-3 w-4 h-4 text-2xl font-bold group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleViewProjectsClick}
                className="px-8 py-3.5 text-sm sm:text-base font-semibold text-purple-200 rounded-lg border border-purple-500/40 bg-white/5 hover:bg-white/10 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      <PopUpForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        isResume={true}
      />
    </section>
  );
}
