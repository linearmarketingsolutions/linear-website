import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "One operator. An AI-native growth engine built to prove that one person with the right systems can outperform a full agency.",
};

export default function About() {
  return <AboutContent />;
}
