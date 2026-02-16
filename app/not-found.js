import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 500 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '8rem',
            fontWeight: 800,
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--rich-black)',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: 'var(--gray-500)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
          }}
        >
          Looks like this page snuck off to the party early. Let&apos;s get you back on track!
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--gradient)',
            color: 'var(--white)',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '100px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
