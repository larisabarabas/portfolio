export const LOGO_TEXT = "stefania";

export const EMAIL = "stef@stefaniabarabas.com";

// One title everywhere (page title, meta, OG image, hero) so every surface
// describes the same person.
export const JOB_TITLE = "Senior engineer and designer";

export const SITE_DESCRIPTION = `${JOB_TITLE} working across product, design, and AI. I find where users stall or give up, then design the fix and build it.`;

// localStorage key for the light/dark choice. Read by the inline script in
// layout.tsx and by ThemeToggle, so they must agree.
export const THEME_STORAGE_KEY = "stef-theme";

// Home page slides, in order. Labels show in the section rail and pager.
export const SECTION_LABELS = {
  hero: "Intro",
  services: "Services",
  work: "Work",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  experiments: "Experiments",
  devnotes: "Writing",
  contact: "Contact",
} as const;

export const NAV = {
  railLabel: "Sections",
  menuLabel: "All sections",
  previousLabel: "Previous section",
  nextLabel: "Next section",
  themeLabel: "Dark theme",
};

export const HERO = {
  eyebrow: JOB_TITLE,
  headingLine1: "Hi, I'm Stefania.",
  headingLine2: "I turn ideas into shipped software and fix what's broken.",
  body: "I work across product, design, and AI.",
  status:
    "I find where users stall or give up, then design the fix and build it myself.",
  primaryCtaLabel: "How I can help",
  secondaryCtaLabel: "Tell me about your project",
  secondaryCtaSubject: "Project inquiry",
  imageHint: "Hover to see it in color",
};

export const ABOUT = {
  eyebrow: "About",
  heading: "I ask before I build",
  bodyParagraph1:
    "I build scalable, high-performance web applications, usually somewhere between product, design, and, increasingly, AI. I design the interfaces I ship, build AI features that hold up in production, and explain the trade-offs in natural language.",
  bodyParagraph2:
    "Besides frontend engineering and product, there are some things I care about that are not always visible: I learn the business domain before I touch the architecture, I ask why before how, and performance and usability still matter to me long after the feature has shipped.",
  statChips: [
    "Product Engineering",
    "Frontend Architecture",
    "UX/UI",
    "Product Thinking",
    "Building in Public",
    "AI-Assisted Development",
  ],
  portraitAlt: "Stefania Barabas",
  portraitPlaceholder: "Drop a portrait photo",
};

export const SERVICES = {
  eyebrow: "Services",
  heading: "How I can help",
  lead: "I work on digital products from the first prototype to the fixes after launch. I find where people drop off, make slow or hard-to-use pages fast and accessible, build features properly without a long ramp-up, and turn AI demos and ideas into products that hold up with real users.",
  workedAcrossLabel: "Worked across",
  workedAcross:
    "Enterprise pricing and promotion software · fintech · translation software · large-scale web apps · real estate and property management software · booking platforms · microlearning and training software · community products",
  problemHeading: "The problem",
  whatIDoHeading: "What I do",
  proofHeading: "Where I've done it",
  startLabel: "How we start",
  ctaLabel: "Ask about this",
  items: [
    {
      id: "s1",
      number: "01",
      title: "UX & conversion audit",
      problem:
        "People land on your site or sign up, then stop somewhere before the product makes sense to them. You can see it in the numbers, but not where it happens.",
      whatIDo:
        "I go through your site and product the way a new user would, on desktop and on a phone. Depending on what you need, that includes screenshots of where each issue happens and a comparison with two or three competitors. Every audit ends with a walkthrough of what matters most, in plain language, and what I'd change. Then I design and build the fixes.",
      proof: [
        "At Code of Talent I worked on conversion: I simplified user flows, prototyped a new onboarding, and built a guided product tour. I also built my own audit tooling that measures performance, accessibility and mobile issues in a real browser, so the findings start with real data.",
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
        "At RELEX I was on the on-call rotation, where I tracked down and fixed performance issues caused by large amounts of data, on both the client and the server.",
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
        "At RELEX I led two frontend epics end to end, from planning and technical requirements to delivery, working with backend, product and design.",
        "At Cognizant I designed a micro-frontend architecture and set up a Lerna monorepo for a team of 50+ engineers.",
        "On that app I also integrated payments, analytics and error tracking. I use Sentry and Datadog to see what breaks and for whom.",
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
        "At RELEX I turned a vibe-coded concept into a production-ready feature, working closely with design. I checked the AI-generated code against the product requirements and our architecture, and reworked what wouldn't hold up long term.",
        "Fika for Substack, Retrobox and Huecode each started as an idea that I designed and built myself, with AI coding agents.",
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
        "React",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "React Query",
        "Zustand",
      ],
    },
    {
      label: "Product & UX",
      tone: "outline" as const,
      color: "primary" as const,
      items: [
        "User flows",
        "Prototyping",
        "UX audits",
        "Accessibility",
        "Figma",
      ],
    },
    {
      label: "AI-assisted development",
      tone: "solid" as const,
      color: "secondary" as const,
      items: [
        "Claude Code",
        "Claude Design",
        "Cursor",
        "OpenCode",
        "LM Studio",
      ],
    },
    {
      label: "Architecture",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Micro-frontends", "Monorepos (Lerna)", "Design systems"],
    },
    {
      label: "Testing & observability",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Playwright", "Vitest", "Jest", "Cypress", "Sentry", "Datadog"],
    },
    {
      label: "Backend",
      tone: "outline" as const,
      color: "primary" as const,
      items: ["Node.js", "PostgreSQL", "Go", "Python"],
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
  eyebrow: "Technical and Content Writing",
  heading: "Stef's Dev Notes",
  featureHeading:
    "A newsletter about engineering judgment in an industry obsessed with speed",
  featureBody:
    "This is where I think out loud about frontend engineering and engineering in general. The code I'm writing, the career lessons I'm learning, and all the invisible work that actually matters, shared one small note at a time.",
  featureCtaLabel: "Read Stef's Dev Notes",
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
  backLinkLabel: "Back to portfolio",
  problemHeading: "The problem",
  uxFlowHeading: "UX flow",
  uxFlowPlaceholderDefault: "Drop the flow diagram",
  decisionsHeading: "Key decisions & tradeoffs",
  outcomeHeadingDefault: "Outcome",
  backToPortfolioCtaLabel: "Back to portfolio",
};

export const FOOTER = {
  copyright: "Made by Stefania Larisa Barabas · 2026",
};
