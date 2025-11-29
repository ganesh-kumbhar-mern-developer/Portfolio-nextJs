"use client";
import {
  Calendar,
  MapPin,
  Code,
  Briefcase,
  Trophy,
  Zap,
  ExternalLink,
} from "lucide-react";
import { AnimatedBackground } from "../skills/AnimatedBackground.jsx";

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      title: "ReactJs Developer",
      company: "Seven Mentor Corporate Services Pvt. Ltd.",
      location: "Pune, Maharashtra",
      duration: "Feb 2025 – Present",
      type: "Full-time",
      description:
        "Developing full-stack MERN applications including official websites with 60% user engagement increase. Implementing micro-frontend architecture, secure REST APIs, and NodeMailer OAuth2.0 integration.",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Tailwind",
        "REST APIs",
      ],
      achievements: [
        "60% user engagement increase",
        "Micro-frontend architecture",
        "Secure API & email integration",
      ],
      icon: Code,
      current: true,
    },
    {
      id: 2,
      title: "ReactJs Developer (Internship)",
      company: "Seven Mentor Corporate Services Pvt. Ltd.",
      location: "Pune, Maharashtra",
      duration: "Oct 2024 – Jan 2025",
      type: "Internship",
      description:
        "Contributed to MERN stack development, CMS/LMS modules, role-based access control, and responsive UI implementation.",
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
      achievements: [
        "CMS & LMS development",
        "Role-based access control",
        "Responsive UI implementation",
      ],
      icon: Code,
      current: false,
    },
  ];

  return (
    <section className="py-12 relative bg-black/95" id="experience">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[rgb(173,151,245)] to-[rgb(147,108,255)] bg-clip-text text-transparent mb-4">
            <span className="text-white">1.5+ Years</span> Of Experience
          </h2>
          <p className="text-gray-400 text-lg">
            Professional journey & key projects
          </p>
        </div>

        {/* Compact Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(117,78,249)]/30 to-transparent hidden lg:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="group">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-10 w-3 h-3 bg-[rgb(117,78,249)] rounded-full -translate-x-1/2 shadow-lg shadow-[rgb(117,78,249)]/50 group-hover:scale-125 transition-all duration-300 hidden lg:block z-10" />

                {/* Card */}
                <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/50 backdrop-blur-md border border-[rgb(117,78,249)]/20 rounded-2xl p-6 lg:p-8 hover:border-[rgb(117,78,249)]/40 hover:shadow-2xl hover:shadow-[rgb(117,78,249)]/20 transition-all duration-400 hover:-translate-y-1 lg:ml-20">
                  {/* Header Row */}
                  <div className="flex items-start lg:items-center justify-between mb-4 lg:mb-6 gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[rgb(117,78,249)] to-[rgb(147,108,255)] rounded-xl flex items-center justify-center shadow-lg shadow-[rgb(117,78,249)]/30 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                        <exp.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-[rgb(117,78,249)] transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-[rgb(117,78,249)] font-semibold text-base">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="flex flex-col items-end gap-1 text-sm lg:text-base">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Briefcase className="w-3 h-3" />
                        <span className="text-gray-500">{exp.type}</span>
                      </div>
                      {exp.current && (
                        <div className="px-2.5 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-xs font-medium text-green-400">
                          Current
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 border-t border-[rgb(117,78,249)]/10 pt-6">
                    {/* Description & Tech */}
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                        {exp.description}{" "}
                        <strong>{exp.technologies.join(", ")}</strong> expertise
                        applied for <strong>scalable web applications</strong>{" "}
                        and <strong>high-performance digital solutions</strong>.
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[rgb(117,78,249)]/10 text-[rgb(117,78,249)] text-xs rounded-lg border border-[rgb(117,78,249)]/30 hover:bg-[rgb(117,78,249)]/20 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm lg:text-base">
                        <Trophy className="w-4 h-4 text-[rgb(117,78,249)]" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-300 text-sm"
                          >
                            <Zap className="w-3.5 h-3.5 text-[rgb(117,78,249)] mt-0.5 flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
