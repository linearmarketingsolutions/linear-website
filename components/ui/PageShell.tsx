"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell-wrapper">
      <Navbar />
      <main role="main" className="page-shell-main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
