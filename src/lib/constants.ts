export const LOGO_TEXT = "stefania";

export const EMAIL = "stef@stefaniabarabas.com";

export const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "devnotes", label: "Stef's Dev Notes" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: "Engineering and Product, with a touch of Design",
  headingLine1: "Hi, I'm Stefania.",
  headingLine2: "I turn ideas into shipped software.",
  body: "Senior engineer working across product, design, and AI.",
  status:
    "I find where users stall or give up, then design the fix and build it myself.",
  primaryCtaLabel: "How I can help ↓",
  secondaryCtaLabel: "Email me",
};

export const ABOUT = {
  eyebrow: "About",
  heading: "I ask before I build",
  bodyParagraph1: "I've spent the last eight years building scalable, high-performance web applications, usually somewhere between product, design, and, increasingly, AI. I design the interfaces I build, I ship AI features that hold up in production, and I explain the trade-offs in natural language.",
  bodyParagraph2: "Besides frontend engineering and product, there are some things I care about that are not always visible: I learn the business domain before I touch the architecture, I ask why before how, and performance and usability still matter to me long after the feature has shipped.",
  statChips: ["8+ years engineering", "Product Engineering", "Frontend Architecture", "UX/UI", "Product Thinking", "Building in Public", "AI-Assisted Development"],
  portraitAlt: "Portrait",
  portraitPlaceholder: "Drop a portrait photo",
};

export const SERVICES = {
  eyebrow: "Services",
  heading: "How I can help",
  lead: "I help with the parts of a digital product where users decide to stay or leave: the landing page, onboarding, checkout and the main flow, and how fast all of it loads. I find where users stall or give up, design the fix, and build it myself.",
  workedAcrossLabel: "Worked across",
  workedAcross:
    "Enterprise pricing and promotion software · fintech · translation tech · large-scale web apps · real estate tech · booking platforms · microlearning and training tech · community products",
  problemHeading: "The problem",
  whatIDoHeading: "What I do",
  proofHeading: "Where I've done it",
  startLabel: "How we start",
  ctaLabel: "Ask about this →",
  items: [
    {
      id: "s1",
      number: "01",
      title: "UX & conversion audit",
      problem:
        "People land on your site or sign up, then stop somewhere before the product makes sense to them. You can see it in the numbers, but not where it happens.",
      whatIDo:
        "I go through your site and product the way a new user would, on desktop and on a phone, and compare it with two or three competitors. Every issue comes with a screenshot of where it happens, how much it matters, and what I would change. Then I design and build the fixes.",
      proof: [
        "At Code of Talent I simplified user flows, built onboarding prototypes, and implemented a guided product tour to improve conversion. I also built my own audit tooling that measures performance, accessibility and mobile issues in a real browser, so the findings start with real data.",
      ],
      proofAsList: false,
      start:
        "A small fixed-price audit, about 2 to 5 days, depending on the product's size and business domain. You get a ranked list of issues, two or three quick wins I can ship first, and a proposal for the larger changes.",
      subject: "UX & conversion audit",
    },
    {
      id: "s2",
      number: "02",
      title: "Performance & mobile fixes",
      problem:
        "The site looks fine on your laptop, but it's slow on a phone, the layout breaks on small screens, or parts of it can't be used with a keyboard or screen reader. Most visitors won't tell you. They just leave.",
      whatIDo:
        "I measure the site with Lighthouse, plus real-user data where there's enough traffic. Then I fix what slows it down or shuts people out, and check the result on real devices. If you don't have monitoring yet, I can set it up, so you can see where things break for users.",
      proof: [
        "At Relex Solutions, performance mattered to every business customer. As part of the on-call rotation, I monitored and fixed performance issues caused by large amounts of data, on both the client and the server.",
      ],
      proofAsList: false,
      start:
        "One page, usually the one that brings in the most sign-ups, measured before and after.",
      subject: "Performance & accessibility",
    },
    {
      id: "s3",
      number: "03",
      title: "Production-ready frontend delivery",
      problem:
        "You have a prototype, a redesign, or a backlog, and you need it built properly without a long ramp-up.",
      whatIDo:
        "I own frontend work end to end: architecture, implementation, testing, reviews, and the follow-through on performance after launch. I learn your business domain first, so the code fits your product.",
      proof: [
        "At Relex I led two complex frontend epics from start to finish and took a vibe-coded concept to a scalable, production-ready feature. In both cases, I owned planning, technical requirements, implementation and delivery while aligning closely with backend, product, design and other business stakeholders.",
        "I was part of the on-call rotation, handling critical issues users hit in production.",
        "At Cognizant I designed a micro-frontend architecture and set up a Lerna monorepo for a 50+ engineer team.",
        "On the same app I integrated payments, analytics and error tracking, and I use Sentry and Datadog to see what breaks and for whom.",
      ],
      proofAsList: true,
      start:
        "One well-scoped feature or epic on a fixed timeline, so we can both see how we work together before committing further.",
      subject: "Frontend delivery",
    },
    {
      id: "s4",
      number: "04",
      title: "From AI prototype or idea to a real product",
      problem:
        "You have an AI-built demo, or an idea that still lives in a doc. It works when you click through it yourself, but you don't know if it will hold up with real users, real data and a real codebase.",
      whatIDo:
        "I map the flow, design the key screens and build a working prototype, using AI tools to move quickly. Then I decide what stays, what gets rewritten, and what it takes to run it in production.",
      proof: [
        'At Relex Solutions I took an initial AI-generated ("vibe-coded") concept into a scalable, production-ready feature in close collaboration with design - evaluating and refining AI output against product requirements, architectural standards, and long-term maintainability.',
        "Fika for Substack, Retrobox and Huecode each started as a single idea that I designed and built myself, assisted by AI coding agents.",
      ],
      proofAsList: false,
      start:
        "You show me the demo or tell me your idea, and I tell you what it would take to ship it. If it's only an idea, we take it to a first prototype you can test with users. We make the decisions together, from the product brief and design to the architecture and tools.",
      subject: "Prototype to production",
    },
  ],
};

export const WORK = {
  eyebrow: "Selected Work",
  heading: "Things I've shipped in public, and things I'm still figuring out",
  emptyState: "Project case studies coming soon.",
  caseStudyLinkLabel: "Read case study",
  liveLinkLabelDefault: "Visit the site",
  githubLinkLabel: "View on GitHub",
  screenshotPlaceholder: "Drop a screenshot",
};

export const EXPERIENCE = {
  eyebrow: "Experience",
  heading: "Where I've honed my skills",
  emptyState: "Experience timeline coming soon.",
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
        "JavaScript",
        "React.js",
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
      items: ["Claude Code", "Claude", "Claude Design", "OpenCode", "Cursor", "LM Studio"],
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
      items: ["Jest", "Vitest", "Playwright", "Cypress", "Datadog", "Sentry"],
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
  body: "I'm available for new projects! Feel free to reach out, I usually respond within a day.",
  linkedinUrl: "https://linkedin.com/in/stefania-barabas",
  githubUrl: "https://github.com/larisabarabas",
  devNotesUrl: "https://stefsdevnotes.substack.com",
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
  devNotesLabel: "Stef's Dev Notes",
  resumeHref: "/stefania-barabas-resume.pdf",
  resumeCtaLabel: "Résumé",
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
  copyright: "Made by Stefania Larisa Barabas · 2026",
};
