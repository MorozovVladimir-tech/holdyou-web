"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function ResetPasswordPage() {
  const [autoOpenFailed, setAutoOpenFailed] = useState(false);

  const deepLink = useMemo(() => {
    if (typeof window === "undefined") return "holdyou://reset-password";

    const url = new URL(window.location.href);

    // Supabase обычно шлёт параметры в query или hash. Берём всё.
    const qs = url.searchParams.toString();
    const hash = url.hash ? url.hash.substring(1) : "";

    const parts: string[] = [];
    if (qs) parts.push(qs);
    if (hash) parts.push(hash);

    const payload = parts.length ? `?${encodeURIComponent(parts.join("&"))}` : "";

    return `holdyou://reset-password${payload}`;
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    screen: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000000",
      color: "#FFFFFF",
      padding: 18,
    },
    content: {
      textAlign: "center",
      maxWidth: 380,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 8,
      lineHeight: 1.15,
    },
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
      width: 190,
      height: 34,
      borderRadius: 8,
      border: "1px solid #00B8D9",
      background: "#000000",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      userSelect: "none",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(0,184,217,0.40)",
      transition: "opacity 120ms ease",
    },
    buttonText: {
      fontSize: 13,
      fontWeight: 600,
      color: "#FFFFFF",
    },
    hint: {
      marginTop: 12,
      fontSize: 10,
      color: "rgba(255,255,255,0.55)",
      lineHeight: 1.5,
    },
    warn: {
      marginTop: 10,
      fontSize: 11,
      color: "rgba(255,255,255,0.75)",
      lineHeight: 1.5,
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: 10,
      padding: "10px 12px",
      background: "rgba(255,255,255,0.04)",
    },
  };

  const pressHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.opacity = "0.8";
    },
    onMouseUp: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.opacity = "1";
    },
    onTouchStart: (e: React.TouchEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.opacity = "0.8";
    },
    onTouchEnd: (e: React.TouchEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.opacity = "1";
    },
  };

  useEffect(() => {
    // Авто-открытие при заходе с письма
    const t = window.setTimeout(() => setAutoOpenFailed(true), 1200);
    window.location.href = deepLink;
    return () => window.clearTimeout(t);
  }, [deepLink]);

  return (
    <main style={styles.screen}>
      <div style={styles.content}>
        <h1 style={styles.title}>Reset password</h1>

        <p style={styles.subtitle}>
          We’re opening the HoldYou app so you can set a new password.
          <br />
          If it doesn’t open, tap the button below.
        </p>

        <div style={styles.footer}>
          <a href={deepLink} style={styles.buttonBase} {...pressHandlers}>
            <span style={styles.buttonText}>Open HoldYou app</span>
          </a>
        </div>

        <p style={styles.hint}>
          If nothing happens, make sure HoldYou is installed (TestFlight).
        </p>

        {autoOpenFailed && (
          <div style={styles.warn}>
            If the app didn’t open:
            <br />
            1) Install HoldYou (TestFlight)
            <br />
            2) Return to HoldYou and try again
          </div>
        )}
      </div>
    </main>
  );
}
