import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Demo',         href: '#demo' },
    { label: 'About',        href: '#about' },
    { label: 'Model',        href: '#model' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', marginRight: 'auto' }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          fontSize: '1.4rem',
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
        }}>
          NextWord<span style={{ color: 'var(--red)' }}>.</span>
        </span>
      </a>

      {/* Center nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        {links.map(link => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="#demo" className="btn-primary btn-red" style={{ fontSize: '13px', padding: '10px 22px' }}>
        Try Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </nav>
  );
}
