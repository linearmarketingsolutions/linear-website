import type { ServiceIconKey } from "./icons";

export interface Capability {
  title: string;
  description: string;
  icon: ServiceIconKey;
}

export interface Pillar {
  id: string;
  title: string;
  tagline: string;
  capabilities: Capability[];
}

export const PILLARS: Pillar[] = [
  {
    id: "marketing-growth",
    title: "Marketing & Growth",
    tagline:
      "Strategy, content, and campaigns engineered for measurable outcomes.",
    capabilities: [
      {
        title: "Full Funnel Marketing Strategy",
        description:
          "OKR-based marketing roadmaps that align awareness, consideration, and conversion into one cohesive system.",
        icon: "funnel",
      },
      {
        title: "Brand Development",
        description:
          "Visual identity, messaging architecture, positioning strategy, and brand voice documentation.",
        icon: "brand",
      },
      {
        title: "Social Media Management",
        description:
          "Content calendars, community management, platform optimization, and consistent organic growth.",
        icon: "social",
      },
      {
        title: "Content Creation",
        description:
          "Short-form video, long-form copy, graphics, email campaigns, white papers, and case studies.",
        icon: "content",
      },
      {
        title: "Paid Advertising",
        description:
          "Meta Ads, Google Ads, TikTok Ads, geo-fencing, programmatic display, retargeting, and media buying.",
        icon: "ads",
      },
      {
        title: "SEO & GEO",
        description:
          "Search engine optimization plus Generative Engine Optimization for AI-powered search visibility.",
        icon: "search",
      },
      {
        title: "Email Marketing",
        description:
          "Campaign strategy, automation sequences, list segmentation, and performance analytics.",
        icon: "email",
      },
      {
        title: "Market & Competitor Research",
        description:
          "Deep-dive intelligence reports that inform strategy and identify opportunities.",
        icon: "research",
      },
      {
        title: "Trade Show & Event Marketing",
        description:
          "Booth design direction, pre/post-show campaigns, collateral, and lead capture systems.",
        icon: "event",
      },
    ],
  },
  {
    id: "technology-development",
    title: "Technology & Development",
    tagline:
      "Production-grade websites, apps, dashboards, and platforms. Built from scratch.",
    capabilities: [
      {
        title: "Custom Website Development",
        description:
          "Hard-coded, performance-optimized websites built to convert. No templates. Built from scratch.",
        icon: "website",
      },
      {
        title: "Web App Development",
        description:
          "Functional web applications with real features, custom logic, and clean interfaces.",
        icon: "webapp",
      },
      {
        title: "UX/UI Design",
        description:
          "User experience design, interface architecture, wireframes, and interactive prototypes.",
        icon: "ux",
      },
      {
        title: "App Development",
        description:
          "Mobile-forward application development scoped to your specific business need.",
        icon: "mobile",
      },
      {
        title: "Custom Dashboard Development",
        description:
          "Internal analytics dashboards, reporting systems, and data visualization tools.",
        icon: "dashboard",
      },
      {
        title: "Custom SaaS Development",
        description:
          "Scoped software products built for your business or for market distribution.",
        icon: "saas",
      },
      {
        title: "Brand System Development",
        description:
          "Hard-coded brand kits with exportable assets, design tokens, and logo variants (SVG, PNG, PDF).",
        icon: "brandSystem",
      },
      {
        title: "Website Hosting & Domain Support",
        description:
          "Deployment, DNS management, uptime monitoring, and ongoing maintenance.",
        icon: "hosting",
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    tagline:
      "Where LMS separates from every other agency. AI deployed as infrastructure, not an afterthought.",
    capabilities: [
      {
        title: "Custom AI Agent Development",
        description:
          "Purpose-built agents designed around your workflows, data, and specific business logic.",
        icon: "agent",
      },
      {
        title: "OpenClaw Setup & Integration",
        description:
          "Full personal AI assistant setup using OpenClaw — the most powerful open-source AI agent platform available. We handle installation, configuration, skill development, and team onboarding. Your business gets a persistent, autonomous AI that operates across every channel you already use.",
        icon: "openclaw",
      },
      {
        title: "Workflow Automation",
        description:
          "End-to-end automation of repetitive processes using AI-assisted logic and trigger systems.",
        icon: "workflow",
      },
      {
        title: "CRM Building & Integration",
        description:
          "Custom CRM configuration, pipeline architecture, and lead flow automation.",
        icon: "crm",
      },
      {
        title: "AI-Powered Content Systems",
        description:
          "Scalable content production pipelines that combine AI generation with human quality control.",
        icon: "contentAi",
      },
      {
        title: "Custom Tool Development",
        description:
          "Proprietary tools, internal platforms, and API integrations built for your exact needs.",
        icon: "tools",
      },
      {
        title: "AI Education & Training",
        description:
          "Structured learning programs that get your team operating confidently with AI tools.",
        icon: "education",
      },
      {
        title: "Tool Onboarding Courses",
        description:
          "Custom onboarding programs for specific platforms — built for your team's actual workflow.",
        icon: "onboarding",
      },
    ],
  },
  {
    id: "business-operations",
    title: "Business Operations & Development",
    tagline:
      "The connective tissue. Strategy, systems, and support that keeps the machine running.",
    capabilities: [
      {
        title: "Business Development Strategy",
        description:
          "Market entry planning, partnership development, and revenue growth roadmaps.",
        icon: "bizdev",
      },
      {
        title: "Sales Support & Enablement",
        description:
          "Sales decks, SOPs, outreach systems, and pipeline support that gives your team leverage.",
        icon: "sales",
      },
      {
        title: "Operations & Logistics",
        description:
          "Process documentation, workflow design, team coordination systems, and operational clarity.",
        icon: "ops",
      },
      {
        title: "Custom Reporting & Analytics",
        description:
          "Performance dashboards, KPI tracking, and data-driven decision systems.",
        icon: "analytics",
      },
      {
        title: "Distributor & Partner Onboarding",
        description:
          "Branded onboarding experiences for distributors and channel partners.",
        icon: "partner",
      },
    ],
  },
];
