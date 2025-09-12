export interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  services?: string[];
  liveUrl?: string;
}

// Sample project data - replace with your actual projects
export const projects: Project[] = [
  {
    slug: "edux-landingpage",
    title: "Minimal Website",
    category: "Web Design",
    client: "Education Startup",
    description: "A clean website showcasing with directional design apporach.",
    heroImage: "/images/projects/EDUX.png",
    galleryImages: [
      "/images/projects/EDUX.png"
    ],
    challenge: "The client needed a portfolio that would stand out in the crowded creative industry while maintaining professional credibility and fast loading times.",
    solution: "We developed a minimal design system with carefully curated typography, strategic white space, and subtle micro-interactions that guide users through the content without distraction.",
    services: ["UI/UX Design", "Frontend Development", "Performance Optimization"],
    liveUrl: ""
  },
  {
    slug: "e-commerce-platform",
    title: "Influencer Profit Website in 3 days",
    category: "Web Development",
    client: "Influencer",
    description: "Modern e-commerce platform with advanced filtering, real-time inventory, and seamless checkout experience.",
    heroImage: "/images/projects/hokkaidomeimei/hkdm1.png",
    galleryImages: [
      "/images/projects/hokkaidomeimei/hkdm1.png",
      "/images/projects/hokkaidomeimei/hkdm2.png"
    ],
    challenge: "Manually accepting orders from followers, spending 3hr per day just replying messages. Online platform would really increase efficiency.",
    solution: "Built with static and node server for Stripe, deployed in 3 days and have monthly revenue of 200000yen while decreasing labor capacity by HUGE. website is built with Next.js, Tailwind CSS, and integrated with Stripe for secure payments.",
    services: ["Full-Stack Development", "Online Payment Gateway", "Performance Optimization"]
  },
  {
    slug: "cafe-branding",
    title: "An Artistic Getaway Cafe",
    category: "Branding",
    client: "Cafe Owner",
    description: "Complete brand identity system including logo, guidelines, and digital assets for international market expansion.",
    heroImage: "/images/projects/cafe/cafe1.png",
    galleryImages: [
      "/images/projects/cafe/cafe1.png",
      "/images/projects/cafe/cafe2.png",
      "/images/projects/cafe/cafe3.png"
    ],
    challenge: "Developing a cohesive brand identity that would work across diverse cultural contexts while maintaining strong brand recognition.",
    solution: "Created a flexible brand system with cultural adaptability built-in, featuring modular design elements and comprehensive guidelines for global implementation.",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
  {
    slug: "bag-branding",
    title: "Clean Brand Identity from Webpage",
    category: "Web Development",
    client: "International Supplier",
    description: "Complete brand identity system including logo, guidelines, and digital assets for international market expansion.",
    heroImage: "/images/projects/bag/bag.png",
    galleryImages: [
      "/images/projects/bag/bag.png"
    ],
    challenge: "Developing a cohesive brand identity that would work across diverse cultural contexts while maintaining strong brand recognition.",
    solution: "Created a flexible brand system with cultural adaptability built-in, featuring modular design elements and comprehensive guidelines for global implementation.",
    liveUrl: "https://web-design-cafe-ruddy.vercel.app",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
  {
    slug: "logistic-cn",
    title: "Sharp Edge and Sharp Business",
    category: "Web Development",
    client: "Global Logistic Company",
    description: "Building web solution for strong impressions for clients in international market expansion.",
    heroImage: "/images/projects/logistic/logistic1.png",
    galleryImages: [
      "/images/projects/logistic/logistic1.png"
    ],
    challenge: "Clients do not have website set up, and a clear goal oriented website is needed.",
    solution: "Designed and developed a clear message delievering website for global implementation. Using sharp edges to define the professionism. As well as using images like shipping containers to draw connections to global logisitcs",
    liveUrl: "",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
  {
    slug: "jpsite",
    title: "Sharp Edge and Sharp Business",
    category: "Web Development",
    client: "Global Logistic Company",
    description: "Building web solution for strong impressions for clients in international market expansion.",
    heroImage: "/images/projects/jpsite/jpsite0.png",
    galleryImages: [
      "/images/projects/jpsite/jpsite0.png",
      "/images/projects/jpsite/jpsite1.png",
      "/images/projects/jpsite/jpsite2.png",
      "/images/projects/jpsite/jpsite3.png",
      "/images/projects/jpsite/jpsite4.png",
    ],
    challenge: "Clients do not have website set up, and a clear goal oriented website is needed.",
    solution: "Designed and developed a clear message delievering website for global implementation. Using sharp edges to define the professionism. As well as using images like shipping containers to draw connections to global logisitcs",
    liveUrl: "",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
  {
    slug: "time-international",
    title: "Use Website to Business Sales Goal",
    category: "Web Development",
    client: "Consumer Goods",
    description: "Building web solution for strong impressions for clients in international market expansion.",
    heroImage: "/images/projects/time/time0.png",
    galleryImages: [
      "/images/projects/time/time0.png",
      "/images/projects/time/time1.png",
      "/images/projects/time/time2.png",
    ],
    challenge: "Clients do not have website set up, and a clear goal oriented website is needed.",
    solution: "Designed and developed a clear message delievering website for global implementation. Using sharp edges to define the professionism. As well as using images like shipping containers to draw connections to global logisitcs",
    liveUrl: "",
    services: ["Brand Strategy", "Visual Identity", "Brand Guidelines"]
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category);
}