"use client";

import React, { useMemo, useState } from "react";

function buildDeepLink(path: string) {
  // ВАЖНО: используем holdyou:///... (три слэша), чтобы это было PATH, а не HOST.
  // Тогда в Expo Linking.parse() это читается как path="auth/reset-password", а не hostname.
  if (typeof window === "undefined") return `holdyou:///${path}`;

  const url = new URL(window.location.href);

  // Собираем параметры из query + hash в один набор
  const params = new URLSearchParams(url.search);

  if (url.hash && url.hash.length > 1) {
    const hashParams = new URLSearchParams(url.hash.substring(1));
    hashParams.forEach((value, key) => params.set(key, value));
  }

  const qs = params.toString();
  return `holdyou:///${path}${qs ? `?${qs}` : ""}`;
}

export default function ResetPasswordPage() {
  const [tried, setTried] = useState(false);

  const deepLink = useMemo(() => buildDeepLink("auth/reset-password"), []);

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
    content: { textAlign: "center", maxWidth: 420 },
    title: { fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.15 },
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
      width: 210,
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
    // Никакого авто — только по клику.
    window.location.href = deepLink;
  };

  return (
    <main style={styles.screen}>
      <div style={styles.content}>
        <h1 style={styles.title}>Reset password</h1>

        <p style={styles.subtitle}>
          Tap the button below to open HoldYou and set a new password.
        </p>

        <div style={styles.footer}>
          {/* Важно: именно user gesture */}
          <a href={deepLink} onClick={onOpen} style={styles.buttonBase} {...pressHandlers}>
            <span style={styles.buttonText}>Open HoldYou app</span>
          </a>
        </div>

        <p style={styles.hint}>If nothing happens, make sure HoldYou is installed (TestFlight).</p>

        {tried && (
          <div style={styles.warn}>
            If the app didn’t open:
            <br />
            1) Install HoldYou (TestFlight)
            <br />
            2) Return to the email and tap the button again
          </div>
        )}
      </div>
    </main>
  );
}
