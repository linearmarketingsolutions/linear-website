import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The LMS AI stack. Custom agents, workflow automation, and intelligence tools deployed for your business.",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
