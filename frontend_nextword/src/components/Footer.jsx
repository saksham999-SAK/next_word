import React from 'react';

const NAV_LINKS = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Demo',         href: '#demo' },
  { label: 'About',        href: '#about' },
  { label: 'Model',        href: '#model' },
];

export default function Footer() {
  return (
    <footer id="model" style={{ background: 'var(--ink)', color: 'var(--white)' }}>

      {/* Main footer body */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '4rem', alignItems: 'start', flexWrap: 'wrap' }}>

          {/* Wordmark + tagline */}
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
              marginBottom: '1.5rem',
            }}>
              NextWord<span style={{ color: 'var(--red)' }}>.</span>
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', maxWidth: '340px', lineHeight: 1.7 }}>
              A deep learning next word prediction model powered by a trained LSTM neural network.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
              <a href="#demo" className="btn-primary btn-red" style={{ fontSize: '13px', padding: '10px 22px' }}>
                Try It Live →
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
              Built With
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['TensorFlow 2.22', 'Keras 3', 'FastAPI', 'React + Vite', 'Tailwind CSS'].map(tech => (
                <span key={tech} className="font-mono" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.5rem 2.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} NextWord AI — Model trained on custom dataset
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
            LSTM · vocab=8978 · maxlen=745
          </span>
          {/* Red square accent */}
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '10px', color: 'white', fontWeight: 700 }}>◼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
