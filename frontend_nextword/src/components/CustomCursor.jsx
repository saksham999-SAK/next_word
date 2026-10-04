import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener('mousemove', move);

    const interactives = document.querySelectorAll('a,button,.nav-link,.sample-chip,.history-entry,.btn-primary,.btn-ghost,.btn-red');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-dot ${hovered ? 'hovered' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
