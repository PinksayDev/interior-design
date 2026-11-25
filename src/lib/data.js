import { unsplash } from "./site";

export const images = {
  hero: unsplash("1618221195710-dd6b41faaea6", 2000),
  about: unsplash("1600210492486-724fe5c67fb0", 1400),
  studio: unsplash("1502672260266-1c1ef2d93688", 1400),
  cta: unsplash("1616486338812-3dadae4b4ace", 2000),
};

export const stats = [
  { value: "12+", label: "Years of experience" },
  { value: "450+", label: "Projects delivered" },
  { value: "30+", label: "Designers & craftsmen" },
  { value: "98%", label: "Happy clients" },
];

export const processSteps = [
  {
    title: "Consultation",
    duration: "Day 1",
    text: "We meet at your site or our studio to understand your needs, lifestyle, budget and timeline.",
  },
  {
    title: "Concept & Design",
    duration: "Week 1 – 2",
    text: "Our designers prepare layouts, mood boards and material palettes that capture your style.",
  },
  {
    title: "3D Visualisation",
    duration: "Week 2 – 3",
    text: "See your space before it is built, with photo-realistic 3D renders. We refine them until you love them.",
  },
  {
    title: "Quotation & Agreement",
    duration: "Week 3",
    text: "A transparent, itemised quote with no hidden costs, followed by a clear project schedule.",
  },
  {
    title: "Execution",
    duration: "Week 4 – 10",
    text: "Our in-house craftsmen and site supervisors build your project with regular quality checks and updates.",
  },
  {
    title: "Handover",
    duration: "Final week",
    text: "Deep cleaning, final styling and a walkthrough. Your space is handed over with warranty documents.",
  },
];

export const team = [
  {
    name: "Ananya Kulkarni",
    role: "Founder & Principal Designer",
    bio: "Ananya trained in interior architecture and has led 300+ residential projects. She is known for warm, timeless spaces.",
    image: unsplash("1438761681033-6461ffad8d80", 600),
  },
  {
    name: "Rohan Mehta",
    role: "Head of Commercial Design",
    bio: "Rohan designs workplaces and retail spaces that balance brand identity with comfort and function.",
    image: unsplash("1500648767791-00dcc994a43e", 600),
  },
  {
    name: "Karan Desai",
    role: "Modular Kitchen Specialist",
    bio: "Karan combines ergonomics and engineering to build kitchens that are a joy to cook in.",
    image: unsplash("1507003211169-0a1dd7228f2d", 600),
  },
];

export const values = [
  { title: "Personal", text: "Every design starts with you: your routines, your family and your story." },
  { title: "Transparent", text: "Itemised quotes, fixed timelines and a single point of contact." },
  { title: "Crafted", text: "In-house carpentry and premium materials, checked at every stage." },
  { title: "Lasting", text: "Up to 10 years of warranty on modular furniture and kitchens." },
];

