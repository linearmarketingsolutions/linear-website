import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your build. One call to map your business, identify gaps, and deploy an AI-powered growth system.",
};

export default function Contact() {
  return <ContactContent />;
}
