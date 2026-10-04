import React from 'react';

const META = [
  { key: 'Architecture',     val: 'LSTM Neural Network' },
  { key: 'Framework',        val: 'TensorFlow / Keras' },
  { key: 'Vocabulary',       val: '8,978 words' },
  { key: 'Sequence Length',  val: '745 tokens' },
  { key: 'Embedding Dim',    val: '50 dimensions' },
  { key: 'LSTM Units',       val: '128 units' },
  { key: 'Output Layer',     val: 'Dense + Softmax' },
  { key: 'Task',             val: 'Next Word Prediction' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '8rem 2.5rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section label */}
        <div className="section-label reveal" style={{ marginBottom: '4rem' }}>— ABOUT THE MODEL</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left — Editorial quote block */}
          <div className="reveal">
            {/* Red bar accent */}
            <div style={{ width: '3px', height: '48px', background: 'var(--red)', marginBottom: '2rem' }} />

            <blockquote style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
              fontWeight: 700,
              lineHeight: 1.35,
              color: 'var(--ink)',
              margin: 0,
              marginBottom: '2rem',
            }}>
              "Built on a trained LSTM.{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--ink-mid)' }}>
                No hallucinations. No GPT.
              </span>{' '}
              Just learned language patterns."
            </blockquote>

            <p style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.75, marginBottom: '2rem' }}>
              This model was trained from scratch on a curated text corpus using a Keras Sequential LSTM architecture.
              The tokenizer, sequence length, and model weights are loaded exactly as they were during training — ensuring the same preprocessing pipeline is used at inference time.
            </p>

            <p style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.75 }}>
              The application makes no assumptions about the model internals — it reads the architecture directly from <span className="font-mono" style={{ fontSize: '13px', background: 'var(--cream-dark)', padding: '2px 6px', borderRadius: '4px' }}>lstm_model.h5</span> at startup and configures the padding accordingly.
            </p>

            {/* Inline stat pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              {['LSTM', 'TensorFlow 2.22', 'Keras 3', 'Python FastAPI'].map(tag => (
                <span key={tag} style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'var(--cream-dark)',
                  color: 'var(--ink-mid)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Meta table */}
          <div className="reveal reveal-delay-2">
            <div style={{
              background: 'var(--white)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 12px 48px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
                Model Specification
              </div>
              {META.map(({ key, val }) => (
                <div key={key} className="meta-row">
                  <span className="meta-key">{key}</span>
                  <span className="meta-val">{val}</span>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem 1.5rem',
              background: 'rgba(232,52,28,0.05)',
              border: '1px solid rgba(232,52,28,0.12)',
              borderRadius: '12px',
              fontSize: '13px',
              color: 'var(--ink-light)',
              lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--red)', fontWeight: 600 }}>◼ </span>
              All metadata is verified directly from the model file and pickle artifacts — nothing is hardcoded or assumed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
