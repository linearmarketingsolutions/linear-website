import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Services — AI Marketing, Web Dev & Automation | Southern California",
  description:
    "Marketing strategy, web development, AI agents, content production, and business operations for companies in Los Angeles, Inland Empire, Orange County, and San Diego. One integrated system by LMS.",
};

const SERVICES = [
  {
    href: "/services/growth-engine",
    badge: "01",
    title: "Growth Engine",
    description:
      "Full-funnel marketing strategy, brand development, paid advertising, SEO & GEO, email marketing, and market research. The strategic core of every LMS engagement.",
    capabilities: ["Marketing Strategy", "Brand Development", "Paid Ads", "SEO & GEO", "Email", "Market Research"],
  },
  {
    href: "/services/content-pipeline",
    badge: "02",
    title: "Content Pipeline",
    description:
      "Video, copy, design, social media, and email — AI-assisted content production at scale. Consistent, on-brand output mapped to every stage of your customer journey.",
    capabilities: ["Content Creation", "Social Media", "Email Campaigns", "Video Production", "Brand Voice", "AI-Assisted"],
  },
  {
    href: "/services/web-development",
    badge: "03",
    title: "Web & App Development",
    description:
      "Production-grade websites, web apps, dashboards, and SaaS platforms. Custom-coded with Next.js, GSAP animations, and Three.js 3D — not templated.",
    capabilities: ["Websites", "Web Apps", "UX/UI", "Dashboards", "SaaS", "Hosting"],
  },
  {
    href: "/services/ai-infrastructure",
    badge: "04",
    title: "AI Infrastructure",
    description:
      "Custom AI agent development, workflow automation, CRM integration, and OpenClaw deployment. AI deployed as infrastructure — not an afterthought.",
    capabilities: ["AI Agents", "OpenClaw", "Automation", "CRM Integration", "Custom Tools", "Content Systems"],
  },
  {
    href: "/services/business-operations",
    badge: "05",
    title: "Business Operations",
    description:
      "Business development strategy, CRM systems, analytics dashboards, sales enablement, and process architecture. The connective tissue that keeps your business running.",
    capabilities: ["Biz Dev", "Sales Enablement", "Analytics", "CRM", "Process Design", "Partner Onboarding"],
  },
  {
    href: "/services/ai-education",
    badge: "06",
    title: "AI Education & Training",
    description:
      "Structured AI training programs, tool onboarding courses, and operational integration. Get your team confidently operating AI tools — not just experimenting.",
    capabilities: ["AI Training", "Tool Onboarding", "Workflow Integration", "Documentation", "Ongoing Support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <section className="light-section py-16 md:py-24">
        <Container as="div">
          <div className="space-y-6">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block rounded-2xl p-8 md:p-10 bg-surface-1 border border-border transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.06)] hover:-translate-y-0.5"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  {/* Badge */}
                  <span className="font-mono text-accent/30 text-4xl md:text-5xl font-bold shrink-0 group-hover:text-accent/60 transition-colors">
                    {service.badge}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-display font-bold text-text-primary text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <svg
                        className="w-5 h-5 text-[#A1A1AA] shrink-0 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-5 max-w-[64ch]">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="font-mono text-xs text-accent/60 bg-accent/[0.05] px-3 py-1 rounded-full border border-accent/10"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
