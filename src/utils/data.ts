export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  liveUrl: string;
  gitUrl: string;
  image: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  points: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  place: string;
  event: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  glowColor: string;
}

export interface SkillNode {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'programming' | 'core';
  level: number; // 0-100
}

export const PERSONAL_INFO = {
  name: "Naveenkumar D",
  title: "Full Stack Developer",
  subtitle: "UI/UX Designer",
  tagline: "Building Premium Digital Experiences Through Design & Code",
  bio: "I am a passionate developer focused on building interactive, highly scalable, and visually premium web experiences. Combining clean frontend aesthetics with robust backend systems, I strive to make every digital touchpoint a memorable journey.",
  education: "Sri Eshwar College of Engineering",
  email: "naveenkumardit8@gmail.com",
  github: "https://github.com/Naveenkumar3327",
  linkedin: "https://www.linkedin.com/in/naveen30122005/",
  portfolio: "https://naveen-kumar-d.vercel.app/"
};

export const SKILLS_DATA: SkillNode[] = [
  // Core
  { name: "Naveenkumar", category: "core", level: 100 },
  // Frontend
  { name: "HTML", category: "frontend", level: 95 },
  { name: "CSS", category: "frontend", level: 90 },
  { name: "JavaScript", category: "frontend", level: 95 },
  { name: "React", category: "frontend", level: 92 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "Tailwind", category: "frontend", level: 95 },
  // Backend
  { name: "Node.js", category: "backend", level: 88 },
  { name: "Express.js", category: "backend", level: 85 },
  // Database
  { name: "MongoDB", category: "database", level: 84 },
  // Cloud
  { name: "AWS", category: "cloud", level: 78 },
  // Programming
  { name: "Java", category: "programming", level: 85 },
  { name: "Python", category: "programming", level: 80 }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Intern",
    company: "Appin Technologies",
    duration: "June 2023 - July 2023",
    type: "Internship",
    points: [
      "Assisted in backend service testing and debugging workflows.",
      "Gained key understanding of network engineering and infrastructure setup.",
      "Worked on minor integration modules with Java-based backend services."
    ]
  },
  {
    id: "exp-2",
    role: "Intern",
    company: "Shadow Fox",
    duration: "Oct 2023 - Dec 2023",
    type: "Internship",
    points: [
      "Developed interactive responsive web client layouts using HTML/CSS and vanilla JS.",
      "Contributed to code review processes and streamlined static frontend assets.",
      "Implemented client-side state handling and state animations with motion libraries."
    ]
  },
  {
    id: "exp-3",
    role: "Freelance Developer",
    company: "SRKV PTC",
    duration: "Feb 2024 - June 2024",
    type: "Freelance",
    points: [
      "Engineered web applications to automate regional student scheduling and class portals.",
      "Optimized load speeds by implementing code-splitting, media compression, and CDN integration.",
      "Maintained system databases and wrote custom query scripts for data cleaning."
    ]
  },
  {
    id: "exp-4",
    role: "Web Developer",
    company: "Agro Nanba",
    duration: "Aug 2024 - Present",
    type: "Part-time / Full-time",
    points: [
      "Leading full stack developer building digital solutions to connect local farmers with regional markets.",
      "Designed and launched responsive Web portals using React.js, Tailwind CSS, Express, and MongoDB.",
      "Integrated secure transaction verification and dynamic mapping APIs to track agricultural shipments."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Student Management System",
    description: "An all-in-one administrative hub for course enrollments, grade tracking, and automated student attendance reporting.",
    longDescription: "A full-scale administration system developed to simplify student registrations and grade allocations. It features role-based access control, analytics dashboards displaying school performance metrics, and a dynamic student progress card exporter.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "student_management"
  },
  {
    id: "proj-2",
    title: "Notes Taking Application",
    description: "A secure, premium workspace tool for capturing markdown notes, tasks, and bookmarks with instantaneous cloud synchronization.",
    longDescription: "A minimalist notes workspace with dynamic Markdown rendering. Implements offline-first cache mechanics, categorizable tagging paths, full-text searching functionality, and secure JWT-based authorization.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Framer Motion"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "notes_taking"
  },
  {
    id: "proj-3",
    title: "Student Career Guidance System",
    description: "An AI-powered guidance portal recommending study paths and skill trees based on students' academic performance and personality metrics.",
    longDescription: "Utilizes lightweight AI processing models to recommend specific tech tracks (Frontend, Cloud, AI, Security) to undergraduate students. Visualizes user progress with interactive skill roadmap trees.",
    tech: ["React.js", "Python", "Flask", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "career_guidance"
  },
  {
    id: "proj-4",
    title: "Medical Appointment Booking App",
    description: "A streamlined healthcare booking app connecting patients with medical specialists, featuring dynamic calendar availability slots.",
    longDescription: "A comprehensive booking system with real-time updates of doctors' schedules. Patients can check doctor profiles, book slots, receive email alerts, and view prescriptions inside a glassmorphic dashboard.",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Nodemailer"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "medical_booking"
  },
  {
    id: "proj-5",
    title: "Campus Connect",
    description: "A centralized social network platform designed for university students to share announcements, projects, and event invites.",
    longDescription: "A high-performance campus social platform with real-time notification feeds, peer messaging boards, event registrations, and direct post-sharing channels. Fully optimized for high mobile traffic.",
    tech: ["React.js", "Tailwind CSS", "Firebase", "WebSockets", "Framer Motion"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "campus_connect"
  },
  {
    id: "proj-6",
    title: "Plant Disease Detection",
    description: "A computer vision model web system allowing users to upload leaf photos and detect plant diseases with treatment guidance.",
    longDescription: "Implements a CNN model trained to identify various crop anomalies. Once uploaded, the image is passed to a backend inference pipeline which predicts the infection and provides organic/chemical treatment advice.",
    tech: ["Python", "TensorFlow", "FastAPI", "React.js", "Tailwind CSS"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "plant_disease"
  },
  {
    id: "proj-7",
    title: "Cover Letter Generator",
    description: "An interactive, automated tool helping job applicants create optimized cover letters based on role descriptions and resume text.",
    longDescription: "A productivity app parsing job roles to generate matching cover letter summaries. Features prompt customizations, exports to PDF/Docx, and template styles matching high-end design layouts.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "PDFKit"],
    liveUrl: "https://github.com/Naveenkumar3327",
    gitUrl: "https://github.com/Naveenkumar3327",
    image: "cover_letter"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    title: "2nd Place",
    place: "Paper Presentation",
    event: "National Level Tech Symposium",
    description: "Presented a research paper on Next-Generation Cryptographic Models for Distributed Cloud Nodes, highlighting throughput and security improvements."
  },
  {
    id: "ach-2",
    title: "3rd Place",
    place: "Project Expo",
    event: "Inter-College Innovation Challenge",
    description: "Developed and exhibited an IoT-based Smart Irrigation System leveraging Soil Moisture Sensor mesh networks and dynamic web reports."
  },
  {
    id: "ach-3",
    title: "4th Place",
    place: "Paper Presentation",
    event: "State Conference on Emerging Technologies",
    description: "Authored and detailed a research prototype on decentralized ledger integrations in agricultural supply chain systems."
  },
  {
    id: "ach-4",
    title: "Participant",
    place: "ZeroDay Ideathon",
    event: "Cyber Security Hackathon",
    description: "Collaborated in an intensive 36-hour sprint drafting scalable models to isolate and mitigate Zero-Day SQL injections in web app layers."
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Cisco Networking",
    issuer: "Cisco Academy",
    year: "2024",
    glowColor: "rgba(0, 200, 150, 0.4)" // Emerald
  },
  {
    id: "cert-2",
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2025",
    glowColor: "rgba(212, 175, 55, 0.4)" // Gold
  },
  {
    id: "cert-3",
    title: "MERN Stack Developer",
    issuer: "Udemy Professional",
    year: "2024",
    glowColor: "rgba(0, 200, 150, 0.4)"
  },
  {
    id: "cert-4",
    title: "Java Programming Masterclass",
    issuer: "Oracle Academy Partner",
    year: "2023",
    glowColor: "rgba(212, 175, 55, 0.4)"
  },
  {
    id: "cert-5",
    title: "Enterprise Network Security",
    issuer: "Fortinet Academy",
    year: "2025",
    glowColor: "rgba(212, 175, 55, 0.4)"
  }
];

export const MOCK_STATS = {
  projectsCompleted: 12,
  technologiesMastered: 16,
  certificationsEarned: 8,
  yearsOfLearning: 4,
  githubContributions: 342,
  leetcodeProblemsSolved: 184
};
