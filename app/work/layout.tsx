import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites, apps, dashboards, and systems built for clients across industries. Real work. Real operations.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
