"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Navbar from "@/components/navbar/Navbar.jsx";
import Home from "@/components/home/Home.jsx";
import About from "@/components/about/About.jsx";
import Certifications from "@/components/certifcations/Certifications.jsx";
import Projects from "@/components/projects/Projects.jsx";
import Skills from "@/components/skills/Skills.jsx";
import Contact from "@/components/contact/Contact.jsx";
import Footer from "@/components/footer/Footer.jsx";
import ToastProvider from "@/components/toaster/ToastProvider.jsx";
import ExperienceSection from "@/components/experience/ExperienceSection.jsx";
import EducationSection from "@/components/education/EducationSection.jsx";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Apply dark mode class
  useEffect(() => {
    // don't replace body.className entirely — keep font / layout classes
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("bright", !darkMode);
  }, [darkMode]);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark/bright mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Wake backend (Render) server
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get("https://portfolio-form-backend-t69y.onrender.com/api/wake-up");
      } catch (e) {}
    };
    wakeServer();
  }, []);

  // ---------------------------
  // ✅ JSON-LD Schema (SEO)
  // ---------------------------
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ganesh Kumbhar",
    "alternateName": "GANESH KUMBHAR",
    "url": "https://gktechhub.com",
    "image": "https://gktechhub.com/profile.jpg",
    "jobTitle": "MERN Stack Developer | React.js Developer | Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Seven Mentor Corporate Services Pvt. Ltd."
    },
    "email": "mailto:ganeshhh2003@gmail.com",
    "telephone": "+91-9096378354",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411004",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/ganeshhh2003",
      "https://linkedin.com/in/ganeshhh2003",
      "https://gktechhub.com",
      "https://www.hackerrank.com/profile/ganeshhh2003"
    ],
    "knowsAbout": [
      "MERN Stack",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "REST API Development",
      "UI/UX",
      "Micro-Frontend Architecture",
      "SEO Optimization",
      "Performance Optimization"
    ],
    "description":
      "Ganesh Kumbhar is a MERN Stack Developer with 1.2+ years of experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB.",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Karmayogi Institute of Technology Shelve, Pandharpur",
      "address": "Solapur, Maharashtra"
    },
    "award": [
      "Gold Badge in JavaScript - HackerRank",
      "Gold Badge in Java - HackerRank",
      "React Certification",
      "CSS Certification"
    ],
    "skills": [
      "JavaScript ES6+",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Redux Toolkit",
      "Tailwind CSS",
      "Bootstrap",
      "jQuery"
    ]
  };

  return (
    <>
      {/* Inject JSON-LD Schema into Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ToastProvider />

      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        sectionRefs={{
          home: homeRef,
          about: aboutRef,
          experience: experienceRef,
          education: educationRef,
          skills: skillsRef,
          certifications: certificationsRef,
          projects: projectsRef,
          contact: contactRef
        }}
      />

      <div className={darkMode ? "dark-mode" : "bright"}>
        <div ref={homeRef}><Home /></div>
        <div ref={aboutRef}><About /></div>
        <div ref={experienceRef}><ExperienceSection /></div>
        <div ref={educationRef}><EducationSection /></div>
        <div ref={skillsRef}><Skills /></div>
        <div ref={certificationsRef}><Certifications /></div>
        <div ref={projectsRef}><Projects /></div>
        <div ref={contactRef}><Contact /></div>
      </div>

      <Footer />
    </>
  );
}
