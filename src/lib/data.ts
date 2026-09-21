import type { LucideIcon } from 'lucide-react'
import {
  Code2, Coffee, Globe, Palette, Braces, BarChart3, FileSpreadsheet,
  Database, GitBranch, Boxes, AppWindow, Cpu,
} from 'lucide-react'

export const personal = {
  name: 'Nitil Kumar',
  shortName: 'Nitil',
  tagline: 'Crafting elegant code, intuitive interfaces & data-driven stories.',
  roles: [
    'Aspiring Software Developer',
    'IT Engineering Student',
    'Web Developer',
    'Power BI Learner',
  ],
  location: 'Bhopal, Madhya Pradesh, India',
  email: 'lodhinitin2005@gmail.com',
  phone: '+91 9755952808',
  linkedin: 'https://linkedin.com/in/nitil-kumar-790635294',
  github: 'https://github.com/niitin001',
  available: true,
  intro:
    "I'm a B.Tech IT student passionate about building clean, performant web experiences, designing insightful dashboards, and writing code that scales. I love turning ideas into polished, real-world products.",
}

export const contactEndpoint = 'https://formsubmit.co/ajax/lodhinitin2005@gmail.com'

export const aboutStats = [
  { label: 'Years of Learning', value: '3+' },
  { label: 'Projects Shipped', value: '2+' },
  { label: 'Credentials', value: '10' },
  { label: 'CGPA', value: '7.2' },
]

export type Skill = {
  name: string
  icon: LucideIcon
  color: string
  category: 'language' | 'tool' | 'concept'
}

export const skills: Skill[] = [
  { name: 'C++',         icon: Code2,            color: '#00599C', category: 'language' },
  { name: 'Java',        icon: Coffee,           color: '#f89820', category: 'language' },
  { name: 'HTML5',       icon: Globe,            color: '#e34f26', category: 'language' },
  { name: 'CSS3',        icon: Palette,          color: '#1572b6', category: 'language' },
  { name: 'JavaScript',  icon: Braces,           color: '#f7df1e', category: 'language' },
  { name: 'Power BI',    icon: BarChart3,        color: '#f2c811', category: 'tool' },
  { name: 'Excel',       icon: FileSpreadsheet,  color: '#217346', category: 'tool' },
  { name: 'DBMS',        icon: Database,         color: '#4479a1', category: 'concept' },
  { name: 'Data Structures', icon: GitBranch,   color: '#ef4444', category: 'concept' },
  { name: 'OOP',         icon: Boxes,            color: '#a855f7', category: 'concept' },
  { name: 'OS',          icon: Cpu,              color: '#22d3ee', category: 'concept' },
  { name: 'VS Code',     icon: AppWindow,        color: '#0078d7', category: 'tool' },
]

export type Project = {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  stack: string[]
  github: string
  liveDemo?: string
  image?: string
  demoStatus?: 'live' | 'coming-soon'
  gradient: string
  accent: string
}

export const projects: Project[] = [
  {
    title: 'Event-shooter',
    subtitle: 'Event Booker Pro - full-stack event booking platform',
    description:
      'A polished event services website for discovering photography packages, browsing event categories, and sending booking enquiries through a modern responsive interface.',
    highlights: [
      'Live Replit demo connected from portfolio',
      'Responsive booking-focused landing experience',
      'Event service sections with clear call-to-action flow',
      'GitHub source available for code review',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/niitin001/Event-shooter',
    liveDemo: 'https://event-booker-pro--lodhinitin2005.replit.app/',
    image: '/images/event-booker-home.svg',
    demoStatus: 'live',
    gradient: 'from-cyan-500/30 via-blue-500/20 to-indigo-500/20',
    accent: '#22d3ee',
  },
  {
    title: 'organic-farming-system',
    subtitle: 'Sustainable agriculture learning platform',
    description:
      'An educational web platform focused on organic farming awareness, crop guidance, and farmer-friendly information architecture for sustainable agriculture practices.',
    highlights: [
      'Structured content for farming practices',
      'Crop and organic method information sections',
      'Mobile-first responsive layout',
      'Live deployment available on Render',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/niitin001/organic-farming-system',
    liveDemo: 'https://organic-farming-system.onrender.com?utm_source=chatgpt.com',
    image: '/images/farming-home.svg',
    demoStatus: 'live',
    gradient: 'from-emerald-400/25 via-cyan-500/20 to-blue-500/20',
    accent: '#10b981',
  },
]

export const experience = [
  {
    role: 'Power BI Intern',
    company: 'CodeAlpha',
    period: 'Feb 2026 - Mar 2026',
    location: 'Remote',
    bullets: [
      'Built interactive dashboards and visual reports from raw datasets.',
      'Performed data modelling, cleaning and DAX measures for KPIs.',
      'Translated business questions into clear, actionable visuals.',
    ],
    icon: 'bar-chart',
    accent: '#22d3ee',
  },
  {
    role: 'IoT Internship',
    company: 'Emertxe',
    period: '2 Mar 2026 - 20 Apr 2026',
    location: 'Remote / Online',
    bullets: [
      'Completed an internship focused on foundational programming in C and micro-controllers.',
      'Worked on IoT concepts and built a project using embedded systems and sensor-based logic.',
      'Strengthened understanding of IoT system design, device interfacing, and project development lifecycle.',
    ],
    icon: 'cpu',
    accent: '#d946ef',
  },
]

export const education = [
  {
    degree: 'B.Tech - Information Technology',
    school: 'Bansal Institute of Science & Technology, Bhopal',
    period: '2023 - 2027',
    detail: 'Current degree pursuit in IT',
    score: '7.2',
    scoreLabel: 'CGPA',
    accent: '#3b82f6',
  },
  {
    degree: 'Higher Secondary School Certificate (Class 12)',
    school: 'Eminent Heights Public School, Bhopal',
    period: '2021 - 2023',
    detail: 'MP Board • Science stream',
    accent: '#8b5cf6',
  },
  {
    degree: 'Secondary School Certificate (Class 10)',
    school: 'Madhya Pradesh Board School, Bhopal',
    period: '2019 - 2020',
    detail: 'Completed schooling under MP Board',
    accent: '#10b981',
  },
]

export type Certification = {
  name: string
  issuer: string
  accent: string
  image: string
  issued?: string
  credentialId?: string
  verifyLink?: string
}

export const certifications: Certification[] = [
  {
    name: 'Power BI Virtual Internship',
    issuer: 'CodeAlpha',
    issued: '18 Mar 2026',
    credentialId: 'CA/DF1/24431',
    image: '/certificates/codealpha-power-bi.png',
    accent: '#2563eb',
  },
  {
    name: 'Internet of Things Internship',
    issuer: 'Emertxe',
    issued: '20 Apr 2026',
    credentialId: 'EI26_015',
    image: '/certificates/emertxe-iot.png',
    accent: '#d946ef',
  },
  {
    name: 'SQL Basic',
    issuer: 'HackerRank',
    issued: '21 Feb 2026',
    credentialId: '49AE535F8A7D',
    verifyLink: 'https://www.hackerrank.com/certificates/49ae535f8a7d',
    image: '/certificates/hackerrank-sql-basic.png',
    accent: '#16a34a',
  },
  {
    name: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    issued: '21 Feb 2026',
    verifyLink: 'https://www.credly.com/badges/341d0252-9456-460a-81fd-0fb8d53afb0f',
    image: '/certificates/ibm-cybersecurity-fundamentals.png',
    accent: '#2563eb',
  },
  {
    name: 'Database Management System',
    issuer: 'NPTEL',
    issued: 'Jul-Sep 2025',
    credentialId: 'NPTEL25CS145S632700750',
    image: '/certificates/nptel-dbms.png',
    accent: '#b91c1c',
  },
  {
    name: 'Fundamentals of OOP',
    issuer: 'NPTEL',
    issued: 'Jan-Apr 2025',
    credentialId: 'NPTEL25CS34S642801574',
    image: '/certificates/nptel-oop.png',
    accent: '#b91c1c',
  },
  {
    name: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    issued: '01 Dec 2024',
    image: '/certificates/cisco-js-essentials.png',
    accent: '#0891b2',
  },
  {
    name: 'Oracle AI Foundations Associate',
    issuer: 'Oracle University',
    issued: '25 Sep 2025',
    credentialId: '102744413OCI25AICFA',
    image: '/certificates/oracle-ai-foundations.png',
    accent: '#dc2626',
  },
  {
    name: 'Introduction to IoT',
    issuer: 'Cisco Networking Academy',
    issued: '17 Sep 2025',
    image: '/certificates/cisco-iot-intro.png',
    accent: '#06b6d4',
  },
  {
    name: 'Letter of Recommendation',
    issuer: 'CodeAlpha',
    issued: '18 Mar 2026',
    credentialId: 'CA/DF1/24431',
    image: '/certificates/codealpha-recommendation.png',
    accent: '#22d3ee',
  },
]

export const socials = [
  { label: 'GitHub',   href: personal.github,    icon: 'github'   },
  { label: 'LinkedIn', href: personal.linkedin,  icon: 'linkedin' },
  { label: 'Email',    href: `mailto:${personal.email}`, icon: 'mail' },
  { label: 'Phone',    href: `tel:${personal.phone.replace(/\s/g,'')}`, icon: 'phone' },
]

export const navLinks = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'experience',   label: 'Experience' },
  { id: 'education',    label: 'Education' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'contact',      label: 'Contact' },
]
