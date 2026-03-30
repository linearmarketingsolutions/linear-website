import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact — AI Marketing Agency | Rancho Cucamonga, CA",
  description:
    "Get in touch with Linear Marketing Solutions in Rancho Cucamonga. AI-powered marketing, web development, and automation for businesses across Southern California. Book a free discovery call.",
};

export default function Contact() {
  return <ContactContent />;
}
