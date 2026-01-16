"use client";

import React, { useMemo, useState } from "react";

function buildDeepLink(path: string) {
  if (typeof window === "undefined") return `holdyou:///${path}`;

  const url = new URL(window.location.href);

  const params = new URLSearchParams(url.search);

  if (url.hash && url.hash.length > 1) {
    const hashParams = new URLSearchParams(url.hash.substring(1));
    hashParams.forEach((value, key) => params.set(key, value));
  }

  const qs = params.toString();
  return `holdyou:///${path}${qs ? `?${qs}` : ""}`;
}

export default function ConfirmedPage() {
  const [tried, setTried] = useState(false);

  const deepLink = useMemo(() => buildDeepLink("confirmed"), []);

  const styles: Record<string, React.CSSProperties> = {
    screen: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff",
      padding: 18,
    },
    content: { textAlign: "center", maxWidth: 380 },
    title: { fontSize: 26, fontWeight: 800, marginBottom: 8, lineHeight: 1.15 },
    subtitle: {
      fontSize: 13,
      fontWeight: 500,
      color: "rgba(255,255,255,0.7)",
      lineHeight: 1.5,
      marginBottom: 14,
    },
    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "center",
      paddingTop: 8,
    },
    buttonBase: {
      width: 200,
      height: 36,
      borderRadius: 10,
      border: "1px solid #00B8D9",
      background: "#000",
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      userSelect: "none",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(0,184,217,0.40)",
      transition: "opacity 120ms ease",
    },
    buttonText: { fontSize: 13, fontWeight: 700, color: "#fff" },
    hint: { marginTop: 12, fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 },
    warn: {
      marginTop: 10,
      fontSize: 11,
      color: "rgba(255,255,255,0.75)",
      lineHeight: 1.5,
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: 12,
      padding: "10px 12px",
      background: "rgba(255,255,255,0.04)",
      textAlign: "left",
    },
    heart: { color: "#059677" },
  };

  const pressHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "0.85"),
    onMouseUp: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1"),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1"),
    onTouchStart: (e: React.TouchEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "0.85"),
    onTouchEnd: (e: React.TouchEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1"),
  };

  const onOpen = () => {
    setTried(true);
    window.location.href = deepLink; // только по клику
  };

  return (
    <main style={styles.screen}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          Email confirmed <span style={styles.heart}>💚</span>
        </h1>

        <p style={styles.subtitle}>
          Your email has been successfully confirmed.
          <br />
          You can now return to the HoldYou app.
        </p>

        <div style={styles.footer}>
          <a href={deepLink} onClick={onOpen} style={styles.buttonBase} {...pressHandlers}>
            <span style={styles.buttonText}>Open HoldYou app</span>
          </a>
        </div>

        <p style={styles.hint}>Read the message above, then tap the button.</p>

        {tried && (
          <div style={styles.warn}>
            If the app didn’t open:
            <br />
            1) Install HoldYou (TestFlight)
            <br />
            2) Come back here and tap again
          </div>
        )}
      </div>
    </main>
  );
}
