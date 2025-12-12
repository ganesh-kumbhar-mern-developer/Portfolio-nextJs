"use client";
import { useState, memo, useMemo, useCallback } from "react";
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

// Memoized StatsCard Component
const StatsCard = memo(({ stat, delay = 0 }) => {
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
});
StatsCard.displayName = 'StatsCard';

// Memoized Header Section
const SkillsHeader = memo(() => (
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
));
SkillsHeader.displayName = 'SkillsHeader';

// Memoized Skill Badge Component
const SkillBadge = memo(({ skill, index }) => (
  <div
    className="px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-700/50 hover:border-[rgb(117,78,249)]/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 cursor-default opacity-0 animate-fade-in hover:scale-105 hover:-translate-y-1"
    style={{ animationDelay: `${600 + index * 50}ms` }}
  >
    {skill}
  </div>
));
SkillBadge.displayName = 'SkillBadge';

// Memoized Skills Section
const SkillsSection = memo(({ skills }) => (
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
          <SkillBadge key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  </div>
));
SkillsSection.displayName = 'SkillsSection';

// Memoized CTA Button
const CTAButton = memo(({ onClick }) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      className="inline-flex items-center bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] text-white px-10 py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-[rgb(117,78,249)]/50"
    >
      <span className="flex items-center">
        Let's Create Something Amazing
        <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 ml-3" />
      </span>
    </button>
  </div>
));
CTAButton.displayName = 'CTAButton';

const Skills = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Memoize static data arrays
  const stats = useMemo(
    () => [
      { label: "Technologies", value: "18+", icon: Code2 },
      { label: "Projects", value: "10+", icon: Target },
      { label: "Experience", value: "1.2+", icon: TrendingUp },
      { label: "Certifications", value: "4+", icon: Award },
    ],
    []
  );

  const skills = useMemo(
    () => [
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
    ],
    []
  );

  // Memoized event handlers
  const handleOpenPopup = useCallback(() => {
    setIsContactPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsContactPopupOpen(false);
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 overflow-hidden bg-black"
    >
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SkillsHeader />

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-20">
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} stat={stat} delay={index * 100} />
          ))}
        </div>

        {/* Skills Section */}
        <SkillsSection skills={skills} />

        {/* CTA */}
        <CTAButton onClick={handleOpenPopup} />
      </div>

      <ContactPopUpForm
        isOpen={isContactPopupOpen}
        onClose={handleClosePopup}
      />
    </section>
  );
};

export default memo(Skills);
