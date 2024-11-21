// src/app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, Book, Briefcase, Code, Sun, Moon, LucideIcon, ExternalLink } from 'lucide-react';
import ViewCounter from '@/components/ViewCounter';

// Tech stack icons
const techIcons = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", // Updated Tailwind icon
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  // Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
} as const;

// Types
type TechIconType = keyof typeof techIcons;

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  isDark: boolean;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isLoaded: boolean;
  isDark: boolean;
}

interface Skill {
  category: string;
  items: TechIconType[];
}

interface Project {
  name: string;
  stack: TechIconType[];
  description: string;
  details: string[];
  link?: string;
}

interface Contact {
  icon: LucideIcon;
  value: string;
  href?: string;
}

interface ResumeData {
  name: string;
  title: string;
  contacts: Contact[];
  summary: string;
  skills: Skill[];
}


// Components
const Card: React.FC<CardProps> = ({ children, className = '', delay = 0, isLoaded, isDark }) => (
  <div
    style={{ 
      animationDelay: `${delay}ms`,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    }}
    className={`relative overflow-hidden rounded-2xl p-6 
      transition-all duration-500 ease-out
      group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
      backdrop-blur-xl border
      ${isDark 
        ? 'bg-gray-800/40 border-gray-700/30 hover:bg-gray-800/50' 
        : 'bg-white/60 border-gray-200/50 hover:bg-white/80'} 
      ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent 
      group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 
      transition-colors duration-500 rounded-2xl"/>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title, isDark }) => (
  <div className="flex items-center gap-3 mb-6">
    <div 
      className={`p-3 rounded-xl transition-all duration-300 
        bg-gradient-to-br group-hover:scale-105
        ${isDark 
          ? 'from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20'
          : 'from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200'}`}
    >
      <Icon className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
    </div>
    <h2 className={`text-2xl font-bold
      ${isDark 
        ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400' 
        : 'text-gray-800'}`}>
      {title}
    </h2>
  </div>
);

// Resume data
const projects: Project[] = [
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

// Main component
export default function ResumePage() {
  const [isDark, setIsDark] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  
  const data: ResumeData = {
    name: "Aueaoangkun Aunmueang",
    title: "Software Engineer 66",
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
    summary: "A Software Engineering student passionate about web application development with expertise in React, Node.js, and a strong commitment to learning software development best practices.",
    skills: [
      { category: "Programming", items: ["JavaScript", "Python", "Java"] },
      { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
      { category: "Backend", items: ["Node", "MongoDB", "MySQL"] },
      { category: "Tools", items: ["GitHub", "VS Code"] }
    ]
  } as const;

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 
      ${isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'}`}>
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-10 animate-blob
          ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000
          ${isDark ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
        <div className={`absolute bottom-0 left-1/2 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000
          ${isDark ? 'bg-pink-500' : 'bg-pink-300'}`}></div>
      </div>

      {/* View Counter Button */}
      <ViewCounter isDark={isDark} />

    {/* Theme Toggle */}
    <button
      onClick={() => setIsDark(!isDark)}
      className={`fixed top-4 right-4 p-2 sm:p-3 rounded-full 
        transition-all duration-300 hover:scale-110 active:scale-95
        backdrop-blur-xl shadow-lg hover:shadow-2xl
        ${isDark 
          ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30' 
          : 'bg-white/80 hover:bg-white border border-gray-200/50'} 
        z-50`}
      aria-label="Toggle theme"
    >
      {isDark 
        ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" /> 
        : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />}
    </button>

      <div className="relative max-w-5xl mx-auto p-4 md:p-8 lg:p-16 space-y-6">
        {/* Profile */}
        <Card delay={0} isDark={isDark} isLoaded={isLoaded}>
          <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <div className="w-40 h-40 mx-auto md:mx-0">
              <div className="w-full h-full rounded-full 
                bg-gradient-to-br from-blue-500 to-purple-500
                p-1 transition-transform duration-300 hover:scale-105 group"
              >
                <div className="w-full h-full rounded-full 
                  flex items-center justify-center text-4xl font-bold text-white
                  transition-all duration-300 group-hover:scale-95
                  bg-white dark:bg-gray-900"
                >
                  {data.name[0]}
                </div>
              </div>
            </div>
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                : 'text-gray-800'}`}>
                {data.name}
              </h1>
              <h2 className={`text-2xl mb-4 ${isDark
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                : 'text-blue-600'}`}>
                {data.title}
              </h2>
              <div className="flex flex-wrap gap-4">
                {data.contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.icon === Github ? "_blank" : undefined}
                    rel={contact.icon === Github ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full
                      transition-all duration-300 hover:scale-105
                      ${isDark
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <contact.icon size={16} className="text-blue-500" />
                    <span>{contact.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card delay={200} isDark={isDark} isLoaded={isLoaded}>
          <SectionTitle icon={Code} title="Skills" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((skill, index) => (
              <div key={index}>
                <h3 className={`font-semibold mb-3 ${isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                  : 'text-gray-700'}`}>
                  {skill.category}
                </h3>
                <div className="space-y-2">
                  {skill.items.map((item, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl flex items-center gap-3
                        transition-all duration-300 hover:scale-105
                        ${isDark
                          ? 'bg-gray-800/50 hover:bg-blue-900/30'
                          : 'bg-gray-100/80 hover:bg-blue-100/80'}
                        border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={techIcons[item]} 
                        alt={item} 
                        className="w-6 h-6"
                      />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card delay={400} isDark={isDark} isLoaded={isLoaded}>
          <SectionTitle icon={Code} title="Projects" isDark={isDark} />
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl
                  transition-all duration-300 hover:scale-[1.02]
                  ${isDark
                    ? 'bg-gray-800/50 hover:bg-gray-700/50'
                    : 'bg-gray-100/50 hover:bg-white'}
                  border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2
                  ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </h3>
                <div className="flex gap-2 mb-3">
                  {project.stack.map((tech, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      key={i}
                      src={techIcons[tech]} 
                      alt={tech}
                      title={tech}
                      className="w-6 h-6 transition-transform duration-300 hover:scale-110"
                    />
                  ))}
                </div>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <ul className="space-y-2">
                  {project.details.map((detail, i) => (
                    <li key={i} className={`flex items-start text-sm
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="mr-2 text-blue-500">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Experience */}
        <Card delay={600} isDark={isDark} isLoaded={isLoaded}>
          <SectionTitle icon={Briefcase} title="Experience" isDark={isDark} />
          <div className="space-y-6">
            <div className={`pl-4 border-l-2 ${isDark ? 'border-blue-500' : 'border-blue-400'}`}>
              <div className="flex flex-wrap justify-between items-start mb-2">
                <div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Software Engineering Student
                  </h3>
                  <p className="text-blue-500">University of Phayao</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm
                  ${isDark 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'bg-blue-100 text-blue-600'}`}>
                  Present
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="mr-2 text-blue-500">•</span>
                  Developing Web Applications using Next.js and React
                </li>
                <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="mr-2 text-blue-500">•</span>
                  Contributing to group projects and collaborative coding initiatives
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Education */}
<Card delay={800} isDark={isDark} isLoaded={isLoaded}>
  <SectionTitle icon={Book} title="Education" isDark={isDark} />
  <div className={`pl-4 border-l-2 ${isDark ? 'border-blue-500' : 'border-blue-400'}`}>
    <div className="flex flex-wrap justify-between items-start">
      <div className="space-y-2">
        <div>
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Bachelor of Engineering
          </h3>
          <h4 className={`text-lg font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Software Engineering
          </h4>
          <p className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="text-blue-500">University of Phayao</span>
            <span>•</span>
            <span>2nd Year Student</span>
          </p>
        </div>
        <div className="space-y-1">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Key Courses:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Data Structures",
              "Web Development",
              "Object-Oriented Programming",
              "Software Engineering"
            ].map((course, index) => (
              <span
                key={index}
                className={`text-xs px-3 py-1 rounded-full
                  ${isDark 
                    ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right space-y-2">
        <span className={`px-3 py-1 rounded-full text-sm inline-block
          ${isDark 
            ? 'bg-blue-500/10 text-blue-400' 
            : 'bg-blue-100 text-blue-600'}`}
        >
          2023 - Present
        </span>
        <div className={`px-10 py-2 rounded-xl text-sm font-medium
          ${isDark 
            ? 'bg-green-500/10 text-green-400 border border-green-800/30' 
            : 'bg-green-100 text-green-600 border border-green-200/50'}`}
        >
          
          <div className="text-lg font-bold">3.49</div>
        </div>
      </div>
    </div>
  </div>
</Card>
      </div>
    </main>
  );
}