export const profile = {
  name: "Ong Cheng Yang",
  shortName: "Cheng Yang",
  role: "Full-stack engineer & team lead",
  current: { title: "Team lead", company: "Giv AI Labs" },
  location: "Kuala Lumpur, Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  shippingSince: 2020,
  email: "chengyang9966@gmail.com",
  site: "https://www.chengyangong.com",
  links: {
    resume: "/ong-cheng-yang-cv.pdf",
    github: "https://github.com/chengyang9966",
    linkedin: "https://my.linkedin.com/in/chengyangong",
  },
} as const;

export const yearsShipping = new Date().getFullYear() - profile.shippingSince;
