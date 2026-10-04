import React, { useEffect, useState } from 'react';
import CustomCursor    from './components/CustomCursor';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import PredictionDemo  from './components/PredictionDemo';
import HowItWorks      from './components/HowItWorks';
import About           from './components/About';
import Footer          from './components/Footer';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [isServerOnline, setIsServerOnline] = useState(false);

  // Check backend health on mount & periodically
  useEffect(() => {
    async function ping() {
      const health = await checkBackendHealth();
      setIsServerOnline(!!health);
    }
    ping();
    const id = setInterval(ping, 15000);
    return () => clearInterval(id);
  }, []);

  // Scroll reveal — observe all .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    // Small timeout so DOM is fully rendered before observing
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar isServerOnline={isServerOnline} />

      <main>
        {/* Offline warning banner */}
        {!isServerOnline && (
          <div style={{
            position: 'fixed',
            top: '64px', left: 0, right: 0,
            zIndex: 90,
            background: 'rgba(232,52,28,0.95)',
            color: 'white',
            fontSize: '13px',
            fontWeight: 500,
            textAlign: 'center',
            padding: '10px 1rem',
            backdropFilter: 'blur(8px)',
          }}>
            ⚠️ Backend server is offline — start FastAPI at{' '}
            <code style={{ fontFamily: "'JetBrains Mono', monospace", background: 'rgba(255,255,255,0.15)', padding: '1px 6px', borderRadius: '4px' }}>
              http://localhost:8000
            </code>
          </div>
        )}

        <Hero />
        <PredictionDemo />
        <HowItWorks />
        <About />
      </main>

      <Footer />
    </>
  );
}
