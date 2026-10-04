import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'User Input',
    desc: 'You type a sequence of words into the interface — any phrase or partial sentence you want to continue.',
    tag: 'Text String',
  },
  {
    num: '02',
    title: 'Tokenization',
    desc: 'The Keras Tokenizer maps each word to its unique integer index using the vocabulary learned during training.',
    tag: 'texts_to_sequences()',
  },
  {
    num: '03',
    title: 'Sequence Padding',
    desc: 'The token list is pre-padded with zeros to a fixed length of 745 — matching the model\'s exact input shape.',
    tag: 'pad_sequences(maxlen=745)',
  },
  {
    num: '04',
    title: 'LSTM Network',
    desc: 'The padded sequence is passed through an Embedding layer into a 128-unit LSTM layer that processes temporal patterns.',
    tag: 'LSTM(units=128)',
  },
  {
    num: '05',
    title: 'Probability Distribution',
    desc: 'A Dense softmax layer produces a probability score for each of the 10,000 words in the model\'s output vocabulary.',
    tag: 'Dense(10000, softmax)',
  },
  {
    num: '06',
    title: 'Next Word',
    desc: 'The token index with the highest probability is decoded back to its word string and returned as the prediction.',
    tag: 'argmax → index_word',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: '8rem 2.5rem',
      background: 'var(--cream-dark)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '1rem' }}>— PIPELINE</div>
            <h2 className="display-lg">
              Six steps from<br />
              <span className="display-italic">words to prediction.</span>
            </h2>
          </div>
          <p style={{ maxWidth: '320px', fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.7 }}>
            Every prediction runs through the same pipeline used during training — no shortcuts, no mocking.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 3rem' }}>
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className={`step-card reveal reveal-delay-${(idx % 4) + 1}`}
            >
              <div className="step-number">{step.num}</div>

              {/* Tag badge */}
              <div style={{ marginBottom: '1rem' }}>
                <span className="font-mono" style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--red)',
                  background: 'rgba(232,52,28,0.08)',
                  border: '1px solid rgba(232,52,28,0.15)',
                  borderRadius: '100px',
                  padding: '3px 10px',
                  letterSpacing: '0.04em',
                }}>
                  {step.tag}
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '0.75rem',
                lineHeight: 1.2,
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: '14px',
                color: 'var(--ink-light)',
                lineHeight: 1.65,
                paddingRight: '1rem',
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Code snippet bar */}
        <div className="reveal" style={{
          marginTop: '5rem',
          background: 'var(--ink)',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, flexShrink: 0 }}>
            Inference
          </div>
          <div className="font-mono" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', overflow: 'hidden' }}>
            <span style={{ color: '#E8341C' }}>tokens</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}> = tokenizer.</span>
            <span style={{ color: '#7DD3FC' }}>texts_to_sequences</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>([text])[0]  →  </span>
            <span style={{ color: '#E8341C' }}>padded</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}> = </span>
            <span style={{ color: '#7DD3FC' }}>pad_sequences</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>([tokens], maxlen=</span>
            <span style={{ color: '#86EFAC' }}>745</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>, padding=</span>
            <span style={{ color: '#FCD34D' }}>'pre'</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>)  →  </span>
            <span style={{ color: '#7DD3FC' }}>model.predict</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>(padded)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
