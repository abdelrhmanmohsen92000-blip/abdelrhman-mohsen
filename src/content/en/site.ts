import type { Discipline } from "../types";

export const person = {
  name: "Abdelrhman Mohsen",
  role: "BIM Architect & Architectural Designer",
  shortRole: "BIM architect and designer",
  base: "Egypt",
  availability: "Open to remote, hybrid and on-site roles, and to relocation. GMT+2.",
  languages: ["Arabic (native)", "English (professional working proficiency)"],
  nationality: "Egyptian",
  sce: "Eligible for Saudi Council of Engineers (SCE) registration",
};

export const contact = {
  email: "architect.abdelrhmanmohsen@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdelrhman-mohsen-bimarchitect",
  linkedinLabel: "linkedin.com/in/abdelrhman-mohsen-bimarchitect",
  // Shown on the Contact page (approved by Abdelrhman, 22 Oct 2026).
  phone: "+20 109 208 3829",
  whatsapp: "https://wa.me/201092083829",
  showPhone: true,
  cv: "/cv/Abdelrhman-Mohsen-CV.pdf",
};

export const seo = {
  title: "Abdelrhman Mohsen, BIM Architect & Architectural Designer",
  description:
    "Portfolio of Abdelrhman Mohsen, a BIM architect and designer in Egypt: Revit modelling to LOD 350+, Navisworks coordination and construction documentation, plus villa, facade, interior and landscape design for projects in Egypt, Saudi Arabia, the UAE and Qatar.",
  keywords: [
    "BIM architect",
    "BIM coordinator",
    "Revit",
    "Navisworks",
    "ISO 19650",
    "architectural design",
    "interior design",
    "facade design",
    "landscape design",
    "architectural visualization",
    "Saudi Arabia",
    "UAE",
    "Qatar",
    "Egypt",
  ],
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/bim", label: "BIM & documentation" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const disciplineLabels: Record<Discipline, string> = {
  architecture: "Architecture",
  exterior: "Exterior & facade",
  interior: "Interior",
  landscape: "Landscape",
  bim: "BIM & documentation",
  visualization: "Visualization",
};

export const ui = {
  skipToContent: "Skip to content",
  menu: "Menu",
  closeMenu: "Close menu",
  downloadCv: "Download CV",
  emailMe: "Email me",
  viewWork: "See the work",
  viewProject: "View project",
  allProjects: "All projects",
  nextProject: "Next project",
  allWork: "All",
  filterLabel: "Filter projects by discipline",
  showingOne: "1 project",
  showingMany: "{n} projects",
  viewGrid: "Images",
  viewIndex: "Index",
  viewLabel: "Show projects as",
  lightboxClose: "Close",
  lightboxPrev: "Previous image",
  lightboxNext: "Next image",
  lightboxOpen: "Enlarge image",
  imageCount: "{i} of {n}",
  fields: {
    type: "Type",
    location: "Location",
    year: "Year",
    area: "Area",
    owner: "Owner",
    consultant: "Consultant",
    status: "Status",
    role: "My role",
    scope: "Deliverables",
    tools: "Tools",
  },
  footerNote: "My role on each project is stated on its page.",
};
