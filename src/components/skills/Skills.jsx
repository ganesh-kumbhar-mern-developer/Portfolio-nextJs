"use client";
import { useState } from "react";
import {
  Code2,
  Database,
  Globe,
  Palette,
  TestTube,
  Layers,
  Zap,
  Cpu,
  FileCode,
  Braces,
  Chrome,
  Github,
  ArrowRight,
  Workflow,
  Star,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  ChevronRight,
  Code,
  Command,
  Archive,
} from "lucide-react";
import ContactPopUpForm from "../forms/ContactPopUpForm.jsx";
import { AnimatedBackground } from "../skills/AnimatedBackground.jsx";

const SkillCard = ({ title, skills, icon: Icon, gradient, delay = 0 }) => {
  return (
    <div
      className="group relative opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(117,78,249)]/20 to-[rgb(147,108,255)]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className={`relative h-full min-h-[320px] rounded-2xl p-6 lg:p-8 ${gradient} backdrop-blur-sm border border-[rgb(117,78,249)]/20 hover:border-[rgb(117,78,249)]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[rgb(117,78,249)]/10 hover:-translate-y-1`}
      >
        {/* Header */}
        <div className="flex items-center mb-6 lg:mb-8">
          <div className="relative">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
          </div>
          <div className="ml-4 lg:ml-5">
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              {title}
            </h3>
            <div className="flex items-center mt-1 lg:mt-2">
              <div className="w-10 h-1 bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] rounded-full" />
              <ChevronRight className="w-4 h-4 text-[rgb(117,78,249)] ml-2" />
            </div>
          </div>
        </div>
        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="relative group/skill opacity-0 animate-fade-in"
              style={{ animationDelay: `${delay + index * 80}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 lg:p-5 border border-white/10 hover:border-[rgb(117,78,249)]/40 hover:bg-white/10 transition-all duration-200 hover:scale-105">
                <div className="flex items-center justify-between mb-2 lg:mb-3">
                  <skill.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(117,78,249)]" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2 h-2 lg:w-2.5 lg:h-2.5 text-[rgb(117,78,249)] fill-current ml-0.5"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white font-semibold text-sm lg:text-base">
                  {skill.name}
                </p>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 lg:mt-3">
                  <div
                    className="h-1.5 bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] rounded-full animate-progress-bar"
                    style={{ animationDelay: `${delay + index * 80 + 400}ms` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ stat, delay = 0 }) => {
  return (
    <div
      className="group relative opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative bg-gray-900/40 backdrop-blur-sm border border-[rgb(117,78,249)]/20 rounded-xl p-6 hover:border-[rgb(117,78,249)]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(117,78,249)]/10">
        <div className="text-center">
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[rgb(117,78,249)] to-[rgb(147,108,255)] rounded-xl flex items-center justify-center mx-auto">
              <stat.icon className="w-7 h-7 text-white" />
            </div>
          </div>
          <h3
            className="text-3xl font-bold text-white mb-2 opacity-0 animate-scale-in"
            style={{ animationDelay: `${delay + 200}ms` }}
          >
            {stat.value}
          </h3>
          <p className="text-[rgb(117,78,249)] font-semibold">{stat.label}</p>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Skills from About section - organized into 3 categories
  const coreLanguages = [
    { name: "JavaScript (ES6+)", icon: Code },
    { name: "TypeScript", icon: Code2 },
    { name: "HTML", icon: Globe },
    { name: "CSS", icon: Palette },
  ];

  const frameworks = [
    { name: "React.js", icon: Zap },
    { name: "Next.js", icon: Workflow },
    { name: "Redux Toolkit", icon: Layers },
    { name: "Express", icon: Command },
  ];

  const backendTools = [
    { name: "Node.js", icon: Cpu },
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "REST APIs", icon: ArrowRight },
  ];

  const stats = [
    { label: "Technologies", value: "18+", icon: Code2 },
    { label: "Projects", value: "10+", icon: Target },
    { label: "Experience", value: "1.2+", icon: TrendingUp },
    { label: "Certifications", value: "4+", icon: Award },
  ];
  const skills = [
    // Core Languages
    "JavaScript (ES6+)",
    "TypeScript",
    "HTML",
    "CSS",
    "JSON",

    // Frameworks & Libraries
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "jQuery",
    "Express",
    "Bootstrap",
    "Tailwind CSS",

    // Backend & Databases
    "Node.js",
    "MongoDB",
    "MySQL",
    "REST APIs",

    // Tools & Others
    "Git",
    "GitHub",
    "NPM",
    "Babel",
    "Jest",

    // Additional Skills
    "Responsiveness",
    "SEO",
    "UI/UX",
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 overflow-hidden bg-black"
    >
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-[rgb(117,78,249)]/10 to-[rgb(147,108,255)]/10 backdrop-blur-sm border border-[rgb(117,78,249)]/30 rounded-full px-6 py-3 mb-8 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-[rgb(117,78,249)] mr-2" />
            <span className="text-[rgb(117,78,249)] font-semibold">
              Technical Expertise
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Skills That
            <br />
            <span className="bg-gradient-to-r from-[rgb(117,78,249)] via-[rgb(147,108,255)] to-[rgb(117,78,249)] bg-clip-text text-transparent">
              Drive Innovation
            </span>
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming complex challenges into elegant solutions through
            <span className="text-[rgb(117,78,249)] font-semibold">
              {" "}
              cutting-edge technologies
            </span>
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-20">
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} stat={stat} delay={index * 100} />
          ))}
        </div>

        {/* Skills Section */}
        <div
          className="relative group opacity-0 animate-slide-in mb-6"
          style={{ animationDelay: "600ms" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(117,78,249)]/20 to-[rgb(147,108,255)]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative bg-gray-900/40 backdrop-blur-2xl border border-gray-800/50 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-[rgb(117,78,249)]/20 to-[rgb(147,108,255)]/20 rounded-xl">
                <Zap className="w-6 h-6 text-[rgb(117,78,249)]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Technical Skills
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-700/50 hover:border-[rgb(117,78,249)]/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 cursor-default opacity-0 animate-fade-in hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="flex justify-center ">
          <button
            onClick={() => setIsContactPopupOpen(true)}
            className="inline-flex items-center bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] text-white px-10 py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-[rgb(117,78,249)]/50"
          >
            <span className="flex items-center">
              Let's Create Something Amazing
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 ml-3" />
            </span>
          </button>
        </div>
      </div>
      <ContactPopUpForm
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </section>
  );
};

export default Skills;
