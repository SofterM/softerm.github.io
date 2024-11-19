"use client";
import React, { useState } from 'react';
import { Github, Mail, Phone, Award, Book, Briefcase, Code, Sun, Moon, LucideIcon } from 'lucide-react';

export default function ResumePage() {
  const [isDark, setIsDark] = useState(false);

  // Define the interface for SectionTitle props
  interface SectionTitleProps {
    icon: LucideIcon;
    title: string;
  }

  // ข้อมูลส่วนตัว - แก้ไขข้อมูลของคุณที่นี่
  const data = {
    name: "Aueaoangkun Aunmueang",
    title: "Software Engineer",
    contacts: [
      { icon: Mail, value: "66023096@up.ac.th" },
      { icon: Phone, value: "0843236188" },
      { icon: Github, value: "github.com/SofterM" },
    ],
    summary: "นักศึกษาสาขาวิศวกรรมซอฟต์แวร์ที่สนใจในการพัฒนาเว็บแอปพลิเคชัน มีพื้นฐานในการใช้ React, Node.js และตั้งใจเรียนรู้การพัฒนาซอฟต์แวร์ที่ดี",

    skills: [
      { category: "Programming", items: ["JavaScript", "Python", "Java"] },
      { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "MongoDB", "SQL"] },
      { category: "อื่นๆ", items: ["Git"] }
    ],
    experiences: [
      {
        "title": "นักศึกษาปัจจุบัน สาขา Software Engineering",
        "company": "มหาวิทยาลัยพะเยา",
        "period": "ปัจจุบัน",
        "details": [
          "ศึกษาและพัฒนา Web Application ด้วย Next.js และ React",
          "เข้าร่วมโปรเจกต์กลุ่ม และมีส่วนร่วมในการพัฒนาโค้ด"
        ]
      }      
    ],
    education: {
      degree: "วิศวกรรมศาสตรบัณฑิต (วิศวกรรมซอฟต์แวร์)",
      university: "มหาวิทยาลัยพะเยา",
      period: "2023 - ปัจจุบัน",
      gpa: "3.49"
    },
    projects: [
      {
        "name": "ระบบแจ้งซ่อมมหาวิทยาลัย",
        "stack": "React, Java, MongoDB",
        "description": "พัฒนาระบบแจ้งซ่อมภายในมหาวิทยาลัย",
        "details": [
          "ระบบสำหรับนักศึกษาในการแจ้งซ่อมอุปกรณ์และสถานที่",
          "ระบบจัดการคำขอซ่อมและติดตามสถานะการซ่อม",
          "ระบบแจ้งเตือนผู้ใช้งานเมื่อการซ่อมเสร็จสิ้น",
          "สามารถดูรายละเอียดเพิ่มเติมได้ที่: repair-up.netlify.app"
        ]
      }
      ,
      {
        "name": "Second UP",
        "stack": "Vue.js, Tailwind",
        "description": "ระบบเว็บไซต์สำหรับซื้อขายของมือสอง",
        "details": [
          "ระบบแสดงรายการสินค้ามือสองพร้อมรายละเอียด",
          "ระบบค้นหาสินค้าตามหมวดหมู่และเงื่อนไขต่าง ๆ",
          "ระบบการจัดการคำสั่งซื้อและการชำระเงิน",
          "ระบบรีวิวสินค้าจากผู้ซื้อ"
        ]
      }      
    ]
  };

  // Card Component
  const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
    children, 
    className = '' 
  }) => (
    <div className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${isDark? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-md border ${isDark? 'border-gray-700/30' : 'border-gray-200/30'} ${className}`}>
      {children}
    </div>
  );

  // Section Title Component
  const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title }) => {
    return (
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
          <Icon className="text-blue-500" size={20} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    );
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${isDark? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Theme Toggle */}
      <button onClick={() => setIsDark(!isDark)} className={`fixed top-4 right-4 p-3 rounded-full transition-all ${isDark? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg hover:shadow-xl`} aria-label="Toggle theme">
        {isDark? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700" />}
      </button>
      <div className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16">
        <div className="space-y-6">
          {/* Header/Profile */}
          <Card className="text-center md:text-left">
            <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
              <div className="w-40 h-40 mx-auto md:mx-0">
                <div className={`w-full h-full rounded-full ${isDark? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center text-4xl font-bold`}>
                  {data.name[0]}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
                <h2 className="text-2xl text-blue-500 mb-4">{data.title}</h2>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {data.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <contact.icon size={16} />
                      <span>{contact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card>
            <SectionTitle icon={Award} title="เกี่ยวกับตัวฉัน" />
            <p className={isDark? 'text-gray-300' : 'text-gray-600'}>{data.summary}</p>
          </Card>

          {/* Skills */}
          <Card>
            <SectionTitle icon={Code} title="ทักษะ" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{skill.category}</h3>
                  <div className="space-y-2">
                    {skill.items.map((item, i) => (
                      <div key={i} className={`p-2 rounded-lg text-sm ${isDark? 'bg-gray-700/50' : 'bg-gray-100'} hover:bg-blue-500 hover:text-white transition-colors duration-300`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card>
            <SectionTitle icon={Briefcase} title="ประสบการณ์ทำงาน" />
            <div className="space-y-6">
              {data.experiences.map((exp, index) => (
                <div key={index} className={`pl-4 border-l-2 ${isDark? 'border-blue-500' : 'border-blue-300'} hover:border-blue-500 transition-colors duration-300`}>
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className={isDark? 'text-gray-400' : 'text-gray-600'}>{exp.company}</p>
                    </div>
                    <span className={`text-sm ${isDark? 'text-gray-400' : 'text-gray-600'}`}>{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.details.map((detail, i) => (
                      <li key={i} className={isDark? 'text-gray-300' : 'text-gray-600'}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card>
            <SectionTitle icon={Book} title="การศึกษา" />
            <div className={`pl-4 border-l-2 ${isDark? 'border-blue-500' : 'border-blue-300'} hover:border-blue-500 transition-colors duration-300`}>
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{data.education.degree}</h3>
                  <p className={isDark? 'text-gray-400' : 'text-gray-600'}>{data.education.university}</p>
                </div>
                <span className={`text-sm ${isDark? 'text-gray-400' : 'text-gray-600'}`}>{data.education.period}</span>
              </div>
              <p className="mt-2 text-blue-500">GPA: {data.education.gpa}</p>
            </div>
          </Card>

          {/* Projects */}
          <Card>
            <SectionTitle icon={Code} title="โปรเจกต์" />
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div key={index} className={`p-4 rounded-lg ${isDark? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                  <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-blue-500 mb-2">{project.stack}</p>
                  <p className={`mb-3 ${isDark? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {project.details.map((detail, i) => (
                      <li key={i} className={`text-sm ${isDark? 'text-gray-400' : 'text-gray-600'}`}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}