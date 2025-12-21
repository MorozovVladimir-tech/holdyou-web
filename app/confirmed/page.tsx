"use client";

import React from "react";

export default function ConfirmedPage() {
  // временный deep link (позже заменим на реальный scheme)
  const deepLink = "holdyou://confirmed";

  const styles: Record<string, React.CSSProperties> = {
    screen: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000000",
      color: "#FFFFFF",
      padding: 24,
    },
    content: {
      textAlign: "center",
      maxWidth: 520,
    },
    title: {
      fontSize: 34,
      fontWeight: 700,
      marginBottom: 12,
      lineHeight: 1.15,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 500,
      color: "rgba(255,255,255,0.7)",
      lineHeight: 1.5,
      marginBottom: 20,
    },
    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center",
      paddingTop: 12,
    },

    // ====== Кнопка в стиле приложения (как RN buttonBase) ======
    buttonBase: {
      width: 240,
      height: 44,
      borderRadius: 10,
      border: "1px solid #00B8D9",
      background: "#000000",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      userSelect: "none",
      cursor: "pointer",
      boxShadow: "0 0 12px rgba(0,184,217,0.45)",
      transition: "opacity 120ms ease",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 600,
      color: "#FFFFFF",
    },

    hint: {
      marginTop: 16,
      fontSize: 13,
      color: "rgba(255,255,255,0.55)",
      lineHeight: 1.5,
    },
    heart: {
      color: "#059677",
    },
  };

  // “pressed” как в RN
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
          <a href={deepLink} style={styles.buttonBase} {...pressHandlers}>
            <span style={styles.buttonText}>Open HoldYou app</span>
          </a>
        </div>

        <p style={styles.hint}>
          If the app doesn’t open automatically, please return to HoldYou.
        </p>
      </div>
    </main>
  );
}
