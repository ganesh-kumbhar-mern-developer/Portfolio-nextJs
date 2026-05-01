"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavbar } from "@/context/NavbarContext.jsx";

import Home from "@/components/home/Home.jsx";
import About from "@/components/about/About.jsx";
import Certifications from "@/components/certifcations/Certifications.jsx";
import Projects from "@/components/projects/Projects.jsx";
import Skills from "@/components/skills/Skills.jsx";
import Contact from "@/components/contact/Contact.jsx";
import ExperienceSection from "@/components/experience/ExperienceSection.jsx";
import EducationSection from "@/components/education/EducationSection.jsx";
import ContactButtons from "@/components/contactButtons/ContactButtons";
import JsonLdSchemas from "@/components/seo/JsonLdSchemas.jsx";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { setActiveSection, setSectionRefs, targetSection, setTargetSection } = useNavbar();

  // Section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    education: educationRef,
    skills: skillsRef,
    certifications: certificationsRef,
    projects: projectsRef,
    contact: contactRef,
  };

  // On mount: set dark mode and mounted state
  useEffect(() => {
    setMounted(true);
    // Force dark mode and save to localStorage
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");

    // Register refs with context
    setSectionRefs(sectionRefs);
  }, [setSectionRefs]);

  // Handle target section - scroll when refs are ready
  useEffect(() => {
    if (mounted && targetSection && sectionRefs[targetSection]?.current) {
      // Wait a bit for layout to settle
      setTimeout(() => {
        sectionRefs[targetSection]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Clear the target section after scrolling
        setTargetSection(null);
      }, 100);
    }
  }, [mounted, targetSection, sectionRefs, setTargetSection]);

  // Scroll tracking to highlight navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "education", ref: educationRef },
        { id: "skills", ref: skillsRef },
        { id: "certifications", ref: certificationsRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ];

      const scrollPos = window.scrollY;

      for (let sec of sections) {
        const el = sec.ref.current;
        if (el) {
          const top = el.offsetTop - 150;
          const bottom = top + el.offsetHeight;

          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  // Wake backend (Render) server
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get(
          "https://portfolio-form-backend-t69y.onrender.com/api/wake-up",
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
    <>
      {/* JSON-LD Schemas for SEO */}
      <JsonLdSchemas />

      <main>
        <div ref={homeRef}>
          <Home />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={experienceRef}>
          <ExperienceSection />
        </div>
        <div ref={educationRef}>
          <EducationSection />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={certificationsRef}>
          <Certifications />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <ContactButtons
          message="MERN Stack Developer consultation"
          whatsappno="9096378354"
          phoneno="9096378354"
        />
      </main>
    </>
  );
}
