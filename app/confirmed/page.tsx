export default function ConfirmedPage() {
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
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>
            Email confirmed{' '}
            <span style={{ color: '#059677' }}>💚</span>
          </h1>
  
          <p style={{ opacity: 0.85, fontSize: 16 }}>
            Your email has been successfully confirmed.
          </p>
  
          <p style={{ opacity: 0.65, marginTop: 8 }}>
            You can now return to the HoldYou app.
          </p>
        </div>
      </main>
    );
  }
  