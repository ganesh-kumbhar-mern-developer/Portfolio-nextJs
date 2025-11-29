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
import ContactButtons from "@/components/contactButtons/ContactButtons";

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
      } catch (e) { }
    };
    wakeServer();
  }, []);

  // ---------------------------
  // ✅ JSON-LD Schema (SEO)
  // ---------------------------
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Kumbhar",
    jobTitle: "MERN Stack Developer",
    email: "mailto:ganeshhh2003@gmail.com",
    telephone: "+919096378354",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411004",
      addressCountry: "IN",
    },
    url: "https://gktechhub.com",
    image: "https://gktechhub.com/og-image.png",
    sameAs: [
      "https://github.com/Ganesh-D-Kumbhar",
      "https://www.linkedin.com/in/ganesh-d-kumbhar",
      "https://www.hackerrank.com/profile/ganeshhh2003",
      "https://www.instagram.com/ganesh_kumbhar_211",
      "https://www.facebook.com/ganeshkumbhar211",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Karmayogi Institute of Technology, Pandharpur",
    },
    knowsAbout: [
      "MERN Stack",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Full Stack Development",
      "REST APIs",
      "Micro Frontends",
      "UI/UX",
      "Tailwind CSS",
      "Bootstrap",
      "AWS Basics",
      "Git/GitHub",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GK TechHub – Portfolio of Ganesh Kumbhar",
    url: "https://gktechhub.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gktechhub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gktechhub.com",
      },
    ],
  };


  return (
    <>
      {/* Inject JSON-LD Schema into Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Dream Homes – Real Estate Website",
            "description":
              "A modern, responsive real estate web application featuring property listings for 2BHK, 3BHK, 4BHK, penthouses, villas, studios, duplexes, and townhouses for both rent and sale.",
            "image": "https://gktechhub.com/dream-homes/og-image.jpg",
            "url": "https://gktechhub.com/dream-homes",
            "creator": {
              "@type": "Person",
              "name": "Ganesh Kumbhar",
              "url": "https://gktechhub.com",
            },
            "dateCreated": "2025-01-15",
            "keywords": [
              "Real Estate Website",
              "Property Listings",
              "React Developer",
              "Frontend Developer",
              "Buy Property",
              "Rent Property",
              "Dream Homes",
              "Real Estate App",
              "MERN Real Estate Project"
            ],
            "inLanguage": "en",
          }),
        }}
      />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ganesh Kumbhar",
      "jobTitle": "Fullstack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Seven Mentor Pvt. Ltd."
      },
      "sameAs": [
        "https://github.com/Ganesh-D-Kumbhar",
        "https://www.linkedin.com/in/ganesh-d-kumbhar",
        "https://www.hackerrank.com/profile/ganeshhh2003"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Karmayogi Institute of Technology, Pandharpur"
      },
      "url": "https://gktechhub.com",
      "email": "mailto:ganeshhh2003@gmail.com",
      "telephone": "+91 9096378354"
    }),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ganesh Kumbhar",
      jobTitle: "Fullstack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Seven Mentor Corporate Services Pvt. Ltd."
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Karmayogi Institute of Technology, Pandharpur"
      },
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "ReactJs Developer",
          description: "Developing full-stack MERN applications, implementing micro-frontend architecture, secure REST APIs, and NodeMailer OAuth2.0 integration.",
          startDate: "2025-02",
          employmentType: "Full-time"
        },
        {
          "@type": "Occupation",
          name: "ReactJs Developer (Internship)",
          description: "Contributed to MERN stack development, CMS/LMS modules, role-based access control, and responsive UI implementation.",
          startDate: "2024-10",
          endDate: "2025-01",
          employmentType: "Internship"
        }
      ],
      url: "https://gktechhub.com",
      sameAs: [
        "https://github.com/Ganesh-D-Kumbhar",
        "https://www.linkedin.com/in/ganesh-d-kumbhar",
        "https://www.hackerrank.com/profile/ganeshhh2003"
      ]
    }),
  }}
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
        <ContactButtons />
      </div>

      <Footer />
    </>
  );
}
