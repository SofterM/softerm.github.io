"use client";

import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, Code, Book, Briefcase, ExternalLink, Sun, Moon, Cpu, Wrench, Terminal, Layout } from 'lucide-react';
import ViewCounter from '@/components/ViewCounter';
// Define the TechIcon type
type TechIconsType = {
  [key: string]: string;
};

const ModernResumePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Original data
  const data = {
    name: "Aueaoangkun Aunmueang",
    title: "Software Engineer 66",
    profileImage: "/bird.png", 
    contacts: [
      { 
        icon: Mail, 
        value: "66023096@up.ac.th",
        href: "mailto:66023096@up.ac.th"
      },
      { 
        icon: Phone, 
        value: "0843236188",
        href: "tel:0843236188"
      },
      { 
        icon: Github, 
        value: "github.com/SofterM",
        href: "https://github.com/SofterM"
      }
    ],
    skills: [
      { category: "Programming", items: ["JavaScript", "Python", "Java"] },
      { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
      { category: "Backend", items: ["Node", "MongoDB", "MySQL"] },
      { category: "Tools", items: ["GitHub", "VS Code"] }
    ],
    summary: "A Software Engineering student passionate about web application development with expertise in React, Node.js, and a strong commitment to learning software development best practices.",
    education: {
      degree: "Bachelor of Engineering",
      major: "Software Engineering",
      institution: "University of Phayao",
      period: "2023 - Present",
      status: "2nd Year Student",
      gpa: "3.49",
      keyCourses: [
        "Data Structures",
        "Web Development",
        "Object-Oriented Programming",
        "Software Engineering"
      ]
    }
  };

  const techIcons: TechIconsType = {
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  };

  // Map skill categories to icons
  const skillIcons = {
    Programming: Terminal,
    Frontend: Layout,
    Backend: Cpu,
    Tools: Wrench
  };

  const ProfileSection = () => {
    if (!data.profileImage || imageError) {
      return (
        <div className={`aspect-square rounded-2xl overflow-hidden
          flex items-center justify-center text-8xl
          transform transition-all duration-500 hover:scale-105
          ${isDark ? 'bg-purple-900/30 hover:bg-purple-800/40' : 'bg-purple-100/60 hover:bg-purple-200/70'}`}>
          {data.name[0]}
        </div>
      );
    }

    return (
      <div className="aspect-square rounded-2xl overflow-hidden relative group">
      <div className="w-full h-full absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.profileImage}
          alt={`Profile picture of ${data.name}`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
    );
  };
  
  const projects = [
    {
      name: "Maintenance UP",
      stack: ["React", "Java", "MongoDB"],
      description: "A comprehensive repair management system for university facilities",
      details: [
        "Student-facing portal for equipment and facility repair requests",
        "Admin dashboard for repair request management and status tracking",
        "Real-time notification system for repair completion",
        "Live demo: repair-up.netlify.app"
      ],
      link: "https://repair-up.netlify.app"
    },
    {
      name: "Second UP",
      stack: ["Vue.js", "Tailwind CSS"],
      description: "A marketplace platform for second-hand items",
      details: [
        "Feature-rich product listing and detail pages",
        "Advanced search and filtering system",
        "Secure payment processing integration",
        "User review and rating system"
      ]
    }
  ];

  return (
    <main className={`min-h-screen w-full transition-colors duration-500 
      ${isDark 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-800'}`}>
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-transparent" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-20 animate-blob
          ${isDark ? 'bg-purple-700' : 'bg-purple-400'}`} />
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000
          ${isDark ? 'bg-violet-600' : 'bg-violet-300'}`} />
        <div className={`absolute bottom-0 left-1/2 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000
          ${isDark ? 'bg-fuchsia-600' : 'bg-fuchsia-300'}`} />
      </div>

      <ViewCounter isDark={isDark} />    
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 p-2 sm:p-3 rounded-full 
          transition-all duration-300 hover:scale-110 active:scale-95
          backdrop-blur-xl shadow-lg hover:shadow-2xl
          ${isDark 
            ? 'bg-purple-900/30 hover:bg-purple-800/40 border border-purple-700/30' 
            : 'bg-white/80 hover:bg-white border border-purple-200/50'} 
          z-50`}>
        {isDark 
          ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" /> 
          : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
      </button>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[80vh] mb-20">
          {/* Left Content */}
          <div className="space-y-6">
            <p className={`text-xl transform transition-all duration-1000 delay-300
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              Hello!
            </p>
            <h1 className={`text-4xl md:text-5xl font-bold transform transition-all duration-1000 delay-500
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              I&apos;M <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>{data.name}</span>
            </h1>
            <h2 className={`text-2xl transform transition-all duration-1000 delay-700
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              ${isDark ? 'text-purple-300' : 'text-purple-500'}`}>
              {data.title}
            </h2>
            <p className={`transform transition-all duration-1000 delay-900
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {data.summary}
            </p>

            {/* Contacts */}
            <div className={`flex flex-wrap gap-4 transform transition-all duration-1000 delay-1100
              ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {data.contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.icon === Github ? "_blank" : undefined}
                  rel={contact.icon === Github ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full
                    transition-all duration-300 hover:scale-105 hover:shadow-lg
                    ${isDark
                      ? 'bg-purple-900/30 hover:bg-purple-800/40'
                      : 'bg-white/80 hover:bg-purple-50/80'}`}>
                  <contact.icon size={16} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                  <span>{contact.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Avatar */}
          <div className={`transition-all duration-1000 delay-1300 transform
            ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className={`rounded-3xl p-4 max-w-md mx-auto backdrop-blur-sm
              ${isDark ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-white/60 border border-purple-200/50'}`}>
              <ProfileSection />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className={`mb-20 transition-all duration-1000 delay-300 transform
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3
            ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            <Code className="w-8 h-8 animate-pulse" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((skill, index) => {
              const IconComponent = skillIcons[skill.category as keyof typeof skillIcons];
              return (
                <div key={index} className={`rounded-xl p-6 backdrop-blur-sm
                  ${isDark 
                    ? 'bg-purple-900/20 border border-purple-800/30 hover:border-purple-600/50' 
                    : 'bg-white/60 border border-purple-200/50 hover:border-purple-400/50'}
                  transition-all duration-300 hover:transform hover:scale-[1.02]
                  group`}>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2
                    ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    <IconComponent className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    {skill.category}
                  </h3>
                  <div className="space-y-3">
                    {skill.items.map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3
                        rounded-lg transition-all hover:scale-105 group/item
                        ${isDark 
                          ? 'bg-purple-800/30 hover:bg-purple-700/40' 
                          : 'bg-purple-50/60 hover:bg-purple-100/60'}`}>
                            {techIcons[item] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={techIcons[item]}
                              alt={item}
                              className="w-6 h-6 transition-transform group-hover/item:rotate-12"
                            />
                          )}
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section className={`mb-20 transition-all duration-1000 delay-500 transform
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3
            ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            <Briefcase className="w-8 h-8 animate-pulse" />
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className={`rounded-xl p-6 backdrop-blur-sm
                transition-all duration-300 hover:scale-[1.02] group
                ${isDark 
                  ? 'bg-purple-900/20 hover:bg-purple-800/30 border border-purple-800/30 hover:border-purple-600/50' 
                  : 'bg-white/60 hover:bg-white/80 border border-purple-200/50 hover:border-purple-400/50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    {project.name}
                  </h3>
                  {project.link && (
                    <a href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`transition-transform group-hover:scale-110 group-hover:rotate-12
                        ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <div className="flex gap-3 mb-4">
                {project.stack.map((tech, i) => (
                <div key={i} className="group/tech">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={techIcons[tech]} 
                    alt={tech}
                    title={tech}
                    className="w-6 h-6 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:rotate-12"
                  />
                </div>
              ))}
                </div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {project.description}
                </p>
                <ul className="space-y-2 mt-4">
                  {project.details.map((detail, i) => (
                    <li key={i} 
                      className={`flex items-start group/item transition-all hover:translate-x-1
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className={`transition-colors
                        ${isDark 
                          ? 'text-purple-400 group-hover/item:text-purple-300' 
                          : 'text-purple-600 group-hover/item:text-purple-500'}`}>•</span>
                      <span className="ml-2">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className={`mb-20 transition-all duration-1000 delay-700 transform
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3
            ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            <Book className="w-8 h-8" />
            Education
          </h2>
          <div className={`rounded-xl p-6 backdrop-blur-sm
            ${isDark 
              ? 'bg-purple-900/20 border border-purple-800/30' 
              : 'bg-white/60 border border-purple-200/50'}`}>
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                  {data.education.degree}
                </h3>
                <h4 className={`text-lg font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {data.education.major}
                </h4>
                <p className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>{data.education.institution}</span>
                  <span>•</span>
                  <span>{data.education.status}</span>
                </p>
              </div>
              <div className="text-right space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm inline-block
                  ${isDark 
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-800/30' 
                    : 'bg-purple-100 text-purple-600 border border-purple-200/50'}`}>
                  {data.education.period}
                </span>
                <div className={`px-10 py-2 rounded-xl text-sm font-medium
                  ${isDark 
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-800/30' 
                    : 'bg-purple-50 text-purple-600 border border-purple-200/50'}`}>
                  <div className="text-lg font-bold">GPA: {data.education.gpa}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Key Courses:
              </p>
              <div className="flex flex-wrap gap-2">
                {data.education.keyCourses.map((course, index) => (
                  <span
                    key={index}
                    className={`text-sm px-3 py-1 rounded-full transition-all duration-300 hover:scale-105
                      ${isDark 
                        ? 'bg-purple-900/30 text-purple-300 border border-purple-800/30' 
                        : 'bg-purple-50 text-purple-600 border border-purple-200/50'}`}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ModernResumePage;