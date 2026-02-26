export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "var(--space-xl)" }}>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: "40ch" }}>
        Design system foundation is active. Background is{" "}
        <code style={{ fontFamily: "var(--font-mono)" }}>--color-bg</code>.
      </p>
    </main>
  );
}
