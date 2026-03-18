import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { icon: '😊', color: '#4154f1', end: 300, label: 'Happy Clients' },
  { icon: '📋', color: '#ee6c20', end: 521, label: 'Projects' },
  { icon: '🎧', color: '#15be56', end: 1463, label: 'Hours Of Support' },
  { icon: '👥', color: '#bb0852', end: 15, label: 'Hard Workers' },
];

export default function Counts() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="counts" className="counts" ref={ref}>
      <div className="container">
        <div className="counts-grid">
          {stats.map((s, i) => (
            <div key={i} className={`count-box fade-up${visible ? ' visible' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span style={{ fontSize: 42, marginRight: 20 }}>{s.icon}</span>
              <div>
                <div className="count-num">
                  <AnimatedCounter end={s.end} />
                  <span>+</span>
                </div>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
