export const LOGO_TEXT = "stefania";

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  // { id: "howiwork", label: "How I Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "devnotes", label: "Dev Notes" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: "Engineering and Product, with a touch of Design",
  headingLine1: "Hi, I'm Stefania —",
  headingLine2: "always building with a smile.",
  body: "Senior frontend engineer building at the intersection of product, design, and AI.",
  status:
    "Currently untangling building from scratch in various side projects.",
  primaryCtaLabel: "See my work ↓",
  resumeHref: "/stefania-barabas-resume.pdf",
  resumeCtaLabel: "Download résumé",
};

export const ABOUT = {
  eyebrow: "About",
  heading: "Eight years in. Still curious, still learning.",
  bodyParagraph1:
    "I've spent the last eight years building scalable, high-performance web applications — usually somewhere between product, design, and, increasingly, AI. Besides frontend engineering and product, there are some things that are not always visible, that I care about: developer experience, technical documentation, technical debt, mentoring the person who just joined, asking why before how.",
  bodyParagraph2Pre:
    "Outside of sprint cycles, I write about frontend engineering — and engineering in general — the wins and the lessons, at ",
  devNotesLinkLabel: "Stef's Dev Notes. ",
  bodyParagraph2Post:
    "I also build small side projects: an app that turns appreciation into a slice of cake, a retrospective tool that captures notes continuously through a sprint, and a digital terrarium that grows with your habits and emotions.",
  devNotesUrl: "https://stefsdevnotes.substack.com",
  statChips: ["8+ years frontend"],
  portraitAlt: "Portrait",
  portraitPlaceholder: "Drop a portrait photo",
};

export const WORK = {
  eyebrow: "Selected Work",
  heading: "Things I've shipped in public, and things I'm still figuring out",
  emptyState: "Project case studies coming soon.",
  caseStudyLinkLabel: "Read case study →",
  liveLinkLabelDefault: "Visit the site →",
  githubLinkLabel: "View on GitHub →",
  screenshotPlaceholder: "Drop a screenshot",
};

export const EXPERIENCE = {
  eyebrow: "Experience",
  heading: "Where I've honed my skills",
  emptyState: "Experience timeline coming soon.",
};

export const HOW_I_WORK = {
  eyebrow: "How I Work",
  heading: "What working with me looks like.",
  cards: [
    {
      iconBgClass: "bg-primary",
      heading: "I own the outcome",
      body: "Give me the problem, not just the ticket. I'll find the path, flag risks early, and ship.",
    },
    {
      iconBgClass: "bg-tertiary",
      heading: "Saying no is a decision too",
      body: "Every deprioritized idea gets a reason and a trigger to revisit, not just a line through it. A backlog should tell you why something isn't happening, not just what is.",
    },
    {
      iconBgClass: "bg-secondary",
      heading: "I want to understand the tradeoff, not just the decision",
      body: "'Does this work' isn't the answer I'm looking for, I want to know what it cost to get there. Every decision I make gets written down next to what I gave up to make it.",
    },
    {
      iconBgClass: "bg-ink",
      heading: "I build the smallest thing that tells the truth",
      body: "Before I invest in the real version, I build the cheapest thing that can prove — or kill — the idea.",
    },
      {
      iconBgClass: "bg-secondary",
      heading: "AI-assisted, not AI-replaced",
      body: "I reach for Claude Code and other AI tools to move faster on the parts that don't need me, so I can spend the saved time on the parts that do.",
    },
  ],
};

export const SKILLS = {
  eyebrow: "Skills & Tools",
  heading: "What I reach for",
  groups: [
    {
      label: "Frontend",
      tone: "solid" as const,
      color: "primary" as const,
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "shadcn/ui",
      ],
    },
    {
      label: "AI-assisted development",
      tone: "solid" as const,
      color: "secondary" as const,
      items: ["Claude Code", "Claude", "Claude Design", "OpenCode", "Cursor"],
    },
    {
      label: "Architecture",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Micro-frontends", "Monorepos (Lerna)", "Design systems"],
    },
    {
      label: "State & data",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["React Query", "Zustand", "Redux", "GraphQL"],
    },
    {
      label: "Backend & data stores",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Node.js", "Go", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Testing & observability",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Jest", "Vitest", "Datadog", "Sentry"],
    },
    {
      label: "UX/UI",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Figma"],
    },
  ],
};

export const EXPERIMENTS = {
  eyebrow: "Experiments",
  heading: "Ideas still growing",
  statusLabel: "Concept · Design",
  cardHeading: "Terrarium",
  body: "Merging skincare, reading, and small nature rituals into a virtual terrarium that evolves with your habits. Early-stage design exploration — more soon.",
  imageAlt: "Terrarium concept",
  imagePlaceholder: "Drop a terrarium concept image",
};

export const DEV_NOTES = {
  eyebrow: "Writing",
  heading: "Stef's Dev Notes",
  featureHeading:
    "A newsletter about engineering judgment in an industry obsessed with speed",
  featureBody:
    "This is where I think out loud about frontend engineering and engineering in general. The code I'm writing, the career lessons I'm learning, and all the invisible work that actually matters, shared one small note at a time.",
  featureCtaLabel: "Read Stef's Dev Notes →",
  featureUrl: "https://stefsdevnotes.substack.com",
  collaborationsLabel: "Article collaborations",
  logoAlt: "Stef's Dev Notes logo",
  logoPlaceholder: "Drop the Dev Notes logo",
};

export const CONTACT = {
  eyebrow: "Get in touch",
  heading: "Let's talk.",
  body: "Open to engineering opportunities at the intersection of frontend, product and design.",
  email: "stefaniabarabas@gmail.com",
  linkedinUrl: "https://linkedin.com/in/stefania-barabas",
  githubUrl: "https://github.com/larisabarabas",
  devNotesUrl: "https://stefsdevnotes.substack.com",
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
  devNotesLabel: "Stef's Dev Notes",
};

export const CASE_STUDY = {
  backLinkLabel: "← Back to portfolio",
  problemHeading: "The problem",
  uxFlowHeading: "UX flow",
  uxFlowPlaceholderDefault: "Drop the flow diagram",
  decisionsHeading: "Key decisions & tradeoffs",
  outcomeHeadingDefault: "Outcome",
  backToPortfolioCtaLabel: "← Back to portfolio",
};

export const FOOTER = {
  copyright: "Made by Stefania Larisa Barabas · 2026 · Madrid, Spain",
};
