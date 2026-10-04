import React, { useState, useRef } from 'react';
import { predictNextWord } from '../services/api';

const SAMPLES = [
  'I love machine',
  'Deep learning is',
  'Artificial intelligence',
  'Natural language processing',
  'The future of AI',
];

export default function PredictionDemo() {
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);
  const [history, setHistory] = useState([]);
  const textareaRef           = useRef(null);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const handlePredict = async () => {
    if (!input.trim()) {
      setError('Please type a sentence first.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await predictNextWord(input.trim());
      setResult(data);
      setHistory(prev => [
        { input: data.input, prediction: data.prediction, id: Date.now() },
        ...prev.filter(h => h.input !== data.input).slice(0, 7),
      ]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handlePredict();
    }
  };

  const handleAppend = () => {
    if (result?.prediction) {
      const updated = input.trimEnd() + ' ' + result.prediction;
      setInput(updated);
      setResult(null);
      textareaRef.current?.focus();
    }
  };

  return (
    <section id="demo" style={{ padding: '7rem 1.5rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>

        {/* Section Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem', fontSize: '12px', letterSpacing: '0.2em' }}>
            ✦ THE CORE PREDICTION ENGINE
          </div>
          <h2 className="display-lg" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            What comes <span className="display-italic">next?</span>
          </h2>
          <p style={{ color: 'var(--ink-light)', fontSize: '16px', marginTop: '0.75rem', maxWidth: '560px', margin: '0.75rem auto 0' }}>
            Type any phrase or sentence below. Our LSTM neural network analyzes your context and predicts the exact next word.
          </p>
        </div>

        {/* GRAND HERO WORKBENCH CARD */}
        <div className="predict-hero-card reveal" style={{ padding: '0' }}>

          {/* Floating Top Banner Badge */}
          <div style={{
            background: 'var(--red)',
            color: 'white',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: 'white',
                animation: 'dot-pulse 1.4s ease-in-out infinite',
                display: 'inline-block',
              }} />
              <span>MAIN INTERACTIVE WORKBENCH — WRITE YOUR SENTENCE BELOW</span>
            </div>
            <span style={{ opacity: 0.8, fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'none' }}>
              LSTM v1.0 • 8,978 Vocab
            </span>
          </div>

          {/* Main Card Body */}
          <div style={{ padding: '2.5rem 3rem' }}>

            {/* Input Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--red)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '16px' }}>✍️</span> YOUR SENTENCE:
              </span>
              <span style={{
                fontSize: '13px',
                color: 'var(--ink-light)',
                fontFamily: "'JetBrains Mono', monospace",
                background: 'var(--cream)',
                padding: '4px 12px',
                borderRadius: '100px',
                fontWeight: 600,
              }}>
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
            </div>

            {/* HUGE TEXTAREA FOR THE SENTENCE */}
            <textarea
              ref={textareaRef}
              className="predict-textarea"
              rows={3}
              value={input}
              onChange={e => { setInput(e.target.value); setError(null); }}
              onKeyDown={handleKeyDown}
              placeholder='Type something like "I love machine"...'
              style={{ minHeight: '130px' }}
            />

            {/* Sample Chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              marginTop: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(0,0,0,0.06)'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--ink-light)', fontWeight: 600, marginRight: '4px' }}>
                Quick Prompts:
              </span>
              {SAMPLES.map(s => (
                <button
                  key={s}
                  className="sample-chip"
                  onClick={() => { setInput(s); setError(null); setResult(null); textareaRef.current?.focus(); }}
                  style={{
                    fontSize: '13px',
                    padding: '6px 14px',
                    background: input === s ? 'var(--ink)' : 'var(--cream)',
                    color: input === s ? 'white' : 'var(--ink)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '100px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  "{s}"
                </button>
              ))}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="error-msg" style={{ marginTop: '1.25rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Main Action Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '16px',
              alignItems: 'center',
              marginTop: '2rem',
            }}>
              <button
                className="btn-primary"
                onClick={handlePredict}
                disabled={loading || !input.trim()}
                style={{
                  fontSize: '18px',
                  padding: '18px 36px',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(232,52,28,0.3)',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'none',
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="dot-1" style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
                    <span className="dot-2" style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
                    <span className="dot-3" style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
                    Analyzing sequence...
                  </span>
                ) : (
                  <>
                    Predict Next Word
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {input && (
                  <button
                    onClick={() => { setInput(''); setResult(null); setError(null); }}
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--ink-light)',
                      background: 'var(--cream)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '100px',
                      padding: '16px 24px',
                      cursor: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.color = 'var(--red)'; e.target.style.borderColor = 'var(--red)'; }}
                    onMouseLeave={e => { e.target.style.color = 'var(--ink-light)'; e.target.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>

            {/* Shortcut hint */}
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--ink-xlight)', textAlign: 'left' }}>
              Pro Tip: Press <kbd style={{ background: 'var(--cream)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', padding: '2px 7px', fontFamily: 'inherit', fontSize: '11px', fontWeight: 600 }}>⌘</kbd> + <kbd style={{ background: 'var(--cream)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', padding: '2px 7px', fontFamily: 'inherit', fontSize: '11px', fontWeight: 600 }}>Enter</kbd> to predict instantly
            </div>

          </div>

          {/* INTEGRATED PREDICTION RESULT BANNER */}
          <div style={{
            background: result ? 'var(--ink)' : 'var(--cream-dark)',
            padding: '2.5rem 3rem',
            borderTop: '2px solid rgba(0,0,0,0.08)',
            transition: 'background 0.4s ease',
          }}>
            {!result && !loading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: 'var(--ink)'
                  }}>
                    🔮
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Prediction Output Ready</div>
                    <div style={{ fontSize: '13px', color: 'var(--ink-light)' }}>Type a sentence above and click Predict Next Word</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-xlight)', fontFamily: "'JetBrains Mono', monospace" }}>
                  Status: Idle
                </div>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '14px', color: 'var(--ink-mid)', fontWeight: 600 }}>Running LSTM Model Inference...</div>
              </div>
            )}

            {result && !loading && (
              <div className="result-word" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    PREDICTED NEXT WORD FOR "{result.input}"
                  </div>
                  <div className="font-mono" style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 800,
                    color: 'var(--red)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                  }}>
                    {result.prediction || '(none)'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                  <button
                    onClick={handleAppend}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontSize: '14px', fontWeight: 700,
                      color: 'white',
                      background: 'var(--red)',
                      border: 'none',
                      borderRadius: '100px',
                      padding: '12px 24px',
                      cursor: 'none',
                      boxShadow: '0 4px 20px rgba(232,52,28,0.4)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <span>+ Append "{result.prediction}" to Sentence</span>
                  </button>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    Continues sentence in main editor above
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* SESSION HISTORY FOOTER */}
          {history.length > 0 && (
            <div style={{
              background: 'var(--white)',
              padding: '1.25rem 3rem',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Recent Predictions in this session:
                </span>
                <button onClick={() => setHistory([])} style={{ fontSize: '11px', color: 'var(--ink-xlight)', background: 'none', border: 'none', cursor: 'none' }}>
                  Clear History
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setInput(item.input); setResult(null); textareaRef.current?.focus(); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '12px',
                      padding: '4px 12px',
                      background: 'var(--cream)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '6px',
                      cursor: 'none',
                    }}
                  >
                    <span style={{ color: 'var(--ink-mid)', fontWeight: 500 }}>"{item.input}"</span>
                    <span style={{ color: 'var(--red)', fontWeight: 700 }}>→ {item.prediction}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
