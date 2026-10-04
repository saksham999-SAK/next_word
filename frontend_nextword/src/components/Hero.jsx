import React from 'react';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '64px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 2.5rem 80px',
    }}>
      {/* Subtle bg blobs */}
      <div style={{
        position: 'absolute', top: '8%', right: '-6%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.03)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.03)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text Content ── */}
          <div>
            {/* Label */}
            <div className="section-label reveal" style={{ marginBottom: '1.75rem' }}>
              — LSTM Neural Network · TensorFlow · Keras
            </div>

            {/* Headline */}
            <h1 className="display-xl reveal reveal-delay-1" style={{ marginBottom: '0.05em' }}>
              Language,
            </h1>
            <h1 className="display-xl display-italic display-red reveal reveal-delay-2" style={{ marginBottom: '1.75rem' }}>
              predicted.
            </h1>

            {/* Subtitle */}
            <p className="reveal reveal-delay-3" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--ink-light)',
              maxWidth: '500px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 400,
            }}>
              Type a sentence. Our trained LSTM neural network predicts what comes next — no GPT, no hallucinations, just learned language patterns.
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '4rem' }}>
              <a href="#demo" className="btn-primary" style={{ fontSize: '17px', padding: '18px 40px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                Start Predicting
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#how-it-works" className="btn-ghost" style={{ fontSize: '16px', padding: '18px 36px' }}>
                See How It Works
              </a>
            </div>

            {/* Stat row */}
            <div className="reveal" style={{
              paddingTop: '2rem',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            }}>
              {[
                { label: 'Architecture',     value: 'LSTM' },
                { label: 'Framework',        value: 'TensorFlow' },
                { label: 'Vocab Size',       value: '8,978' },
                { label: 'Sequence Length',  value: '745 tokens' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '10px', color: 'var(--ink-xlight)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '4px' }}>
                    {stat.label}
                  </div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Floating Cards ── */}
          <div style={{ position: 'relative', height: '480px' }}>

            {/* Card A — top */}
            <div className="float-card float-a" style={{
              top: '20px', right: '0',
              width: '230px',
              position: 'absolute',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginBottom: '8px', fontWeight: 500 }}>Input</div>
              <div className="font-mono" style={{ fontSize: '13px', color: 'var(--ink)', marginBottom: '10px' }}>"I love machine"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '16px', height: '1px', background: 'var(--ink-xlight)' }} />
                <div style={{ fontSize: '11px', color: 'var(--ink-light)' }}>Predicted</div>
              </div>
              <div className="font-mono" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--red)' }}>learning</div>
            </div>

            {/* Card B — middle left */}
            <div className="float-card float-b" style={{
              top: '180px', left: '0',
              width: '200px',
              position: 'absolute',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginBottom: '6px', fontWeight: 500 }}>Example</div>
              <div className="font-mono" style={{ fontSize: '12px', color: 'var(--ink)', marginBottom: '8px' }}>"Deep learning"</div>
              <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--red)' }}>models</div>
            </div>

            {/* Card C — bottom right */}
            <div className="float-card float-c" style={{
              bottom: '40px', right: '10px',
              width: '210px',
              position: 'absolute',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--ink-light)', marginBottom: '8px', fontWeight: 500 }}>Vocabulary coverage</div>
              <div style={{ height: '4px', background: 'var(--cream-dark)', borderRadius: '2px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{ width: '72%', height: '100%', background: 'var(--red)', borderRadius: '2px' }} />
              </div>
              <div className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>8,978 words</div>
            </div>

            {/* Center accent circle */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px', height: '180px',
              borderRadius: '50%',
              border: '1px dashed rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'var(--red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '22px', fontFamily: "'Playfair Display', serif", fontWeight: 800,
              }}>
                →
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Red square bottom right accent */}
      <div className="red-square" style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}
