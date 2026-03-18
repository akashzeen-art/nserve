import { useRef, useEffect, useState } from 'react';

const faqLeft = [
  { q: 'IT Service Management', a: 'ITIL and industry-standard best practices that promote business effectiveness and efficiency. Includes IT Strategy and IT technology assessment.' },
  { q: 'Infrastructure Optimization', a: 'Reduce the IT Infrastructure costs by consolidation of software and hardware (Servers/Storage/network) through our consolidation services.' },
  { q: 'Application Management', a: 'Provide support for key business applications through our highly trained and certified support personnel. Key areas include Database Management, Middleware Support, Performance Tuning, SOA Support.' },
];

const faqRight = [
  { q: 'Business Continuity Management', a: 'Turn your Infrastructure more resilient with services to improve availability, efficiency and disaster recovery.' },
  { q: 'Modern and Clean Design', a: 'We provide the continual delivery of superior technical support while simultaneously providing industry leading customer satisfaction and support.' },
  { q: 'Data Protection', a: 'We pledge to provide exceptional technology for your business and will provide the best technical talent to manage that technology and surpass your service expectations.' },
];

function AccordionGroup({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            className={`accordion-btn${open === i ? ' open' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.q}
            <span>{open === i ? '▲' : '▼'}</span>
          </button>
          <div className={`accordion-body${open === i ? ' open' : ''}`}>
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FAQ() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className="container">
        <div className={`section-header fade-up${visible ? ' visible' : ''}`}>
          <h2>Why Choose Us?</h2>
          <p>Why Choose Us?</p>
        </div>
        <div className={`faq-grid fade-up${visible ? ' visible delay-200' : ''}`}>
          <AccordionGroup items={faqLeft} />
          <AccordionGroup items={faqRight} />
        </div>
      </div>
    </section>
  );
}
