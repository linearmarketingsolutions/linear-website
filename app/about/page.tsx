import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — AI-Powered Marketing from Southern California",
  description:
    "Based in Rancho Cucamonga, CA. One operator with AI-native infrastructure outperforming full agencies across Los Angeles, Inland Empire, Orange County, and San Diego.",
};

export default function About() {
  return <AboutContent />;
}
