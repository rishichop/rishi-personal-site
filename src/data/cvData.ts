export interface WorkingExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  eqfLevel?: string;
  website?: string;
}

export interface Project {
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface Publication {
  title: string;
  year: string;
  authors: string;
  citation: string;
  publisher: string;
}

export interface LanguageSkill {
  name: string;
  proficiency: string;
  levels: {
    listening: string;
    reading: string;
    writing: string;
    spoken: string;
  };
}

export interface CVData {
  name: string;
  lastName: string;
  title: string;
  nationality: string;
  birthDate: string;
  birthPlace: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  experiences: WorkingExperience[];
  education: Education[];
  projects: Project[];
  publications: Publication[];
  certifications: string[];
  languages: LanguageSkill[];
  skills: string[];
}

export const CV_DATA: CVData = {
  name: "Rishikesh",
  lastName: "Chopade",
  title: "Data Scientist & Full-Stack Developer",
  nationality: "Indian",
  birthDate: "01/09/2003",
  birthPlace: "Nashik, India",
  email: "chopaderishikesh@gmail.com",
  socials: {
    github: "https://github.com/rishichop",
    linkedin: "https://linkedin.com/in/rishikesh-chopade-632a86290" // Clean placeholder or searchable profile URL
  },
  experiences: [
    {
      company: "Bosch Nashik",
      location: "Nashik, India",
      role: "Data Scientist Intern",
      period: "03/2026 – Current",
      highlights: [],
      description: "Researching and developing Hybrid AI frameworks to automate industrial visual inspection and reduce false positives. Designing real-time analytics dashboards to optimize raw material supply chain logistics."
    },
    {
      company: "Adivid Technologies",
      location: "Nashik, India",
      role: "Web Development Intern",
      period: "07/2025 – 12/2025",
      highlights: [],
      description: "Architected and optimized 'The Hub' platform, managing RESTful APIs and modernizing legacy React.js components. Engineered smooth, high-availability visual workflows for tracking student enrollments."
    },
    {
      company: "Arohi Softwares",
      location: "Pune, India",
      role: "Web Development Intern",
      period: "08/2024 – 11/2024",
      highlights: [],
      description: "Engineered backend Flask features and processed large dairy agriculture datasets using Pandas. Built responsive browser UI-components using CSS, JS, and Jinja2 templates."
    }
  ],
  education: [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "Savitribai Phule Pune University",
      period: "07/2021 – 06/2025",
      location: "Nashik, India",
      eqfLevel: "EQF level 6"
    },
    {
      degree: "Higher Secondary Certificate (Class 12th)",
      institution: "K.V.N. Naik Shikshan Prasarak Sanstha's Arts, Commerce & Science College",
      location: "Nashik, India",
      period: "06/2020 – 03/2021"
    },
    {
      degree: "Secondary School Certificate (Class 10th)",
      institution: "Fravashi Academy",
      location: "Nashik, India",
      period: "06/2018 – 03/2019"
    }
  ],
  projects: [
    {
      title: "GEO-ENABLED MFA FOR SECURE TEAM MANAGEMENT",
      period: "09/2024 – 05/2025",
      description: [
        "Developed a geolocation-based multi-factor authentication (MFA) system to restrict access to predefined work zones.",
        "Implemented GPS and IP-based location validation algorithms with predefined safe geographic boundaries.",
        "Integrated Time-based One-Time Passwords (TOTP) as a robust fallback authentication layer for authorized out-of-zone access.",
        "Designed and implemented high-security backend endpoints & responsive user management dashboards.",
        "Monitored live login attempt streams and applied cryptographic data hashing and secure TLS handshakes."
      ],
      technologies: ["Python (Flask)", "PostgreSQL", "Google Maps API", "TOTP", "HTML5", "CSS3", "JavaScript"],
      link: "https://github.com/rishichop/BE_Project"
    }
  ],
  publications: [
    {
      title: "Geolocation-Based Multifactor Authentication Systems for Secure Team Management",
      year: "2025",
      authors: "Rishikesh Chopade, Omkar Thombare, Tejas Tidake, Jayesh Otari, Prof. B.K. Patil",
      citation: "Vol 8, Issue 2, 2025, pg59-64",
      publisher: "Open Access international Journal Of Science & Engineering"
    }
  ],
  certifications: [
    "Full-Stack Web Development Bootcamp - Udemy",
    "The Complete Python Pro Bootcamp - Udemy",
    "Figma UI UX Design Essentials - Udemy",
    "AWS Cloud Practitioner Essentials (NASSCOM Accredited)"
  ],
  languages: [
    {
      name: "Marathi",
      proficiency: "Mother tongue",
      levels: {
        listening: "Native",
        reading: "Native",
        writing: "Native",
        spoken: "Native"
      }
    },
    {
      name: "English",
      proficiency: "C1 Proficient",
      levels: {
        listening: "C1",
        reading: "C1",
        writing: "C1",
        spoken: "C1"
      }
    },
    {
      name: "Hindi",
      proficiency: "C2 Proficient",
      levels: {
        listening: "C2",
        reading: "C2",
        writing: "C2",
        spoken: "C2"
      }
    }
  ],
  skills: [
    "Object Oriented Programming",
    "Python",
    "JavaScript",
    "Node.js",
    "React.js",
    "C++",
    "PostgreSQL",
    "Web Development",
    "Docker",
    "Data Science",
    "Machine Learning (AI, DL, CNN)",
    "MS PowerBI Desktop",
    "Time Management",
    "Communication Skills",
    "Problem Solving",
    "Adaptability"
  ]
};
