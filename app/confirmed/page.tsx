'use client';

export default function ConfirmedPage() {
  const openApp = () => {
    // Deep link (настроим позже, пока можно оставить как заглушку)
    // Если у тебя уже есть схема (например holdyou://), вставь её сюда:
    window.location.href = 'holdyou://confirmed';
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0b',
        color: '#ffffff',
        fontFamily: 'system-ui',
        padding: 24,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 460 }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>
          Email confirmed <span style={{ color: '#059677' }}>💚</span>
        </h1>

        <p style={{ opacity: 0.85, fontSize: 16, marginBottom: 18 }}>
          Your email has been successfully confirmed.
        </p>

        <p style={{ opacity: 0.65, marginBottom: 22 }}>
          You can now return to the HoldYou app.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={openApp}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: '12px 16px',
              borderRadius: 12,
              background: '#059677',
              color: '#0b0b0b',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Open HoldYou app
          </button>

          <a
            href="https://holdyou.app"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Back to HoldYou
          </a>
        </div>

        <div style={{ marginTop: 18, opacity: 0.5, fontSize: 12, lineHeight: 1.4 }}>
          If the app doesn’t open automatically, please return to HoldYou and log in again.
        </div>
      </div>
    </main>
  );
}
