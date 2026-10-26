export const LOGO_TEXT = "stefania";

export const EMAIL = "stef@stefaniabarabas.com";

// 20-minute intro call. A plain link (opens Calendly in a new tab) rather
// than their embed widget, which would load Calendly's script and cookies on
// every visit.
export const CALENDLY_URL = "https://calendly.com/stef-stefaniabarabas/20min";
export const BOOK_CALL_LABEL = "Book a 20-min call";

// One title everywhere (page title, meta, OG image, hero) so every surface
// describes the same person.
export const JOB_TITLE = "Senior engineer and designer";

export const SITE_DESCRIPTION = `${JOB_TITLE} working across product, design, and AI. I find where users stall or give up, then design the fix and build it.`;

// localStorage key for the light/dark choice. Read by the inline script in
// layout.tsx and by ThemeToggle, so they must agree.
export const THEME_STORAGE_KEY = "stef-theme";

// localStorage key for the analytics cookie choice ("granted" | "denied").
// Read by the inline consent script in layout.tsx and by lib/consent.ts.
export const CONSENT_STORAGE_KEY = "stef-consent";

// Google Tag Manager container. Unset locally and on preview deploys, which
// turns off GTM, the consent banner and the footer's cookie settings button.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const COOKIES = {
  eyebrow: "Cookies",
  heading: "Can I count your visit?",
  body: "I use Google Analytics to see which pages get read, so I know what to improve. It sets cookies only if you say yes, and nothing is used for ads.",
  acceptLabel: "Accept",
  declineLabel: "Decline",
  settingsLabel: "Cookie settings",
  privacyLinkLabel: "Privacy policy",
};

export const PRIVACY = {
  path: "/privacy",
  eyebrow: "Privacy",
  title: "What this site collects, and why",
  footerLabel: "Privacy",
  backLinkLabel: "Back to portfolio",
  // Bump whenever the policy text changes.
  lastUpdated: "29 September 2026",
};

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

// Fired on window by the home page's SlideDeck after the current slide
// changes (desktop), so the header can re-check how far the slide scrolled.
export const SLIDE_CHANGE_EVENT = "slidechange";

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
  // Rendered as: lead + one button per word + tail. Each word reveals its
  // idea in the line under the heading.
  headingLead: "I am an engineer who",
  headingTail: "products.",
  words: [
    {
      id: "designs",
      label: "designs",
      idea: "I take a simple idea, explore what it could become, and turn it into something people can experience for themselves.",
    },
    {
      id: "builds",
      label: "builds",
      idea: "I build it myself, starting early with a prototype. I shape the structure and architecture, try different directions, and keep what earns its place.",
    },
    {
      id: "improves",
      label: "improves",
      idea: "I measure how the product behaves with real users, catch problems early, and keep fixing until it does what people need and what it promised.",
    },
  ],
  wordHint: "Hover or tap a word to see what I mean.",
  primaryCtaLabel: "How I can help",
  imageHint: "Hover to see it in color",
};

// The headline as plain text, for surfaces without the hover words (OG image).
export const HERO_HEADLINE = `${HERO.headingLead} ${HERO.words
  .map((word) => word.label)
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1")} ${HERO.headingTail}`;

export const ABOUT = {
  eyebrow: "About",
  heading: "I ask before I build",
  bodyParagraph1:
    "I build web applications somewhere between product, design, and, increasingly, AI. I design the interfaces I ship, build AI features that hold up in production, and explain the trade-offs in plain language.",
  bodyParagraph2:
    "I learn the business domain before I touch the architecture and ask why before how. I care about performance and usability long after a feature has shipped.",
  statChips: [
    "Product Engineering",
    "Frontend Architecture",
    "UX/UI",
    "Performance & Accessibility",
    "AI-Assisted Development",
    "Building in Public",
  ],
  portraitAlt: "Stefania Barabas",
  portraitPlaceholder: "Drop a portrait photo",
};

export const SERVICES = {
  eyebrow: "Services",
  heading: "How I can help",
  lead: "I work on digital products from the first prototype to the fixes after launch. I find where people drop off, make slow pages fast, build features properly, and turn AI demos into products that hold up with real users.",
  workedAcrossLabel: "Worked across",
  workedAcross:
    "Enterprise pricing and promotion software, fintech, translation software, large-scale web apps, real estate and property management software, booking platforms, microlearning and training software, community products.",
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
        "At Code of Talent I simplified user flows, prototyped a new onboarding and built a guided product tour. I also built my own audit tooling that measures performance, accessibility and mobile issues in a real browser, so the findings start with real data.",
      ],
      proofAsList: false,
      start:
        "A small fixed-price audit, about 2 to 5 days, depending on the product's size and business domain. You get a ranked list of issues, two or three quick wins I can ship first, and a proposal for the larger changes.",
      subject: "UX & conversion audit",
    },
    {
      id: "s2",
      number: "02",
      title: "Performance & reliability fixes",
      problem:
        "The site looks fine on your laptop, but it's slow on a phone, the layout breaks on small screens, or parts of it can't be used with a keyboard or screen reader. Or it slows down as the data grows, because of an API that needs restructuring or contract issues between frontend and backend that are hard to detect.",
      whatIDo:
        "I measure the site with Lighthouse, plus real-user data where there's enough traffic. Then I fix what slows it down or shuts people out, on the frontend or in the API behind it, and check the result on real devices. If you don't have monitoring yet, I can set it up, so you can see where things break for users.",
      proof: [
        "At RELEX I was on the on-call rotation, where I tracked down and fixed performance issues caused by large amounts of data, on both the client and the server.",
      ],
      proofAsList: false,
      start:
        "One page, usually the one that brings in the most sign-ups, measured before and after.",
      subject: "Performance & reliability fixes",
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
        "At RELEX I led two frontend epics end to end, from planning and technical requirements to delivery.",
      ],
      proofAsList: false,
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
  decisionsNavLabel: "Decisions",
  outcomeHeadingDefault: "Outcome",
};

export const FOOTER = {
  copyright: "Made by Stefania Larisa Barabas · 2026",
};
