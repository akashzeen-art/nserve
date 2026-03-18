import { useState, useEffect } from 'react';
import './ServicesPage.css';

const Icon = ({ name, className = '' }) => {
  const paths = {
    'arrow-right':         <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    'zap':                 <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    'globe':               <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    'lock':                <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    'activity':            <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    'chevron-down':        <><polyline points="6 9 12 15 18 9"/></>,
    'flame':               <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
    'skull':               <><circle cx="12" cy="11" r="8"/><path d="M12 19v3"/><path d="M9 19h6"/><path d="M9 12h.01"/><path d="M15 12h.01"/></>,
    'hard-drive-download': <><path d="M12 2v8"/><path d="m16 6-4 4-4-4"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/></>,
    'refresh-cw':          <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    'twitter':             <><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></>,
    'linkedin':            <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    'mail':                <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
};

const NAV_ITEMS = [
  { id: 'threats',  label: 'Threat Landscape'  },
  { id: 'strategy', label: 'DRaaS Strategy'    },
  { id: 'outcomes', label: 'Business Outcomes' },
];

function ServicesNav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', ...NAV_ITEMS.map(n => n.id)];
      const current = sections
        .map(id => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? 999 }))
        .filter(o => o.top <= 100)
        .pop();
      if (current) setActiveId(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`sp-nav${scrolled ? ' sp-nav-scrolled' : ''}`}>
        <div className="sp-nav-inner">

          {/* Brand */}
          <a href="/" className="sp-nav-brand">
            <img src="/img/logo.png" alt="NServe" />
            <span>NServe</span>
          </a>

          {/* Desktop links */}
          <ul className="sp-nav-links">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'sp-nav-active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="sp-nav-cta" onClick={() => window.open('https://calendly.com/itstusharpandey/30min', '_blank')}>
            Audit Your Resilience
          </button>

          {/* Hamburger */}
          <button
            className={`sp-hamburger${open ? ' sp-hamburger-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`sp-drawer${open ? ' sp-drawer-open' : ''}`} aria-hidden={!open}>
        <ul>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeId === id ? 'sp-nav-active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id); }}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button className="sp-nav-cta sp-cta-mobile" onClick={() => window.open('https://calendly.com/itstusharpandey/30min', '_blank')}>
              Audit Your Resilience
            </button>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {open && <div className="sp-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}

function HeroSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" className="sp-section sp-hero">
      <div className="sp-container sp-hero-grid">
        <div className="sp-hero-text">
          <span className="sp-badge">Operational Continuity in Hostile Times</span>
          <h1>
            When the World is <span className="sp-gradient-text">Unpredictable</span>, Your Business Shouldn't Be.
          </h1>
          <p>
            In an era of geopolitical instability and regional blackouts, traditional disaster recovery is too slow.
            Position your enterprise for survival with speedy, immutable, and automated DRaaS.
          </p>
          <a href="#strategy" className="sp-btn-primary" onClick={e => { e.preventDefault(); scrollTo('strategy'); }}>
            Deploy Resilience with us <Icon name="arrow-right" className="sp-btn-icon" />
          </a>
        </div>

        <div className="sp-hero-card-wrap">
          <div className="sp-glass-card sp-hero-card">
            <div className="sp-feature-grid">
              {[
                { icon: 'zap',      color: 'purple', title: 'Instant Failover',  desc: 'Zero-touch migration to clean cloud zones.' },
                { icon: 'globe',    color: 'pink',   title: 'Geo-Isolation',     desc: 'Data residency outside of conflict regions.' },
                { icon: 'lock',     color: 'indigo', title: 'Immutability',      desc: 'Locked data safe from cyber-warfare.' },
                { icon: 'activity', color: 'green',  title: 'Ready-State',       desc: '99.999% availability of recovery landing zones.' },
              ].map(f => (
                <div key={f.title} className="sp-feature-tile">
                  <Icon name={f.icon} className={`sp-icon-${f.color}`} />
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sp-scroll-indicator" onClick={() => scrollTo('threats')} role="button" aria-label="Scroll down">
        <Icon name="chevron-down" className="sp-chevron-icon" />
      </div>
    </section>
  );
}

function ThreatsSection() {
  const threats = [
    { icon: 'flame',               color: 'purple', title: 'Kinetic & Political Risks',           desc: 'Infrastructure sabotage, regional power grid blackouts, and physical data center compromise due to conflict.' },
    { icon: 'skull',               color: 'pink',   title: 'State-Sponsored Cyberspace impacts',  desc: 'Wiper malware and sophisticated ransomware designed to paralyze national critical infrastructure and supply chains.' },
    { icon: 'hard-drive-download', color: 'indigo', title: 'Resource Scarcity',                   desc: 'Critical personnel unavailability or hardware supply chain disruptions that make on-premises recovery impossible.' },
  ];
  return (
    <section id="threats" className="sp-section sp-threats">
      <div className="sp-container">
        <div className="sp-section-header">
          <h2>Hostile Environment Risk Factors</h2>
          <p>Organizations face elements out of their control. Modern DRaaS mitigates these "Black Swan" events through architectural diversification.</p>
        </div>
        <div className="sp-threats-grid">
          {threats.map(t => (
            <div key={t.title} className={`sp-glass-card sp-threat-card sp-border-${t.color}`}>
              <div className={`sp-threat-icon sp-bg-${t.color}`}>
                <Icon name={t.icon} className={`sp-icon-${t.color}`} />
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategySection() {
  const steps = [
    { n: 3, title: 'Predictive Validation',             desc: 'Continuous non-disruptive testing ensures the recovery environment is ready for production at all times.' },
    { n: 2, title: 'Automated Orchestration',           desc: 'One-click failover scripts spin up entire virtual networks in safe cloud regions within minutes.' },
    { n: 1, title: 'Continuous Air-Gapped Replication', desc: 'Data is synced in real-time to geo-diverse object storage with strict immutability locks.' },
  ];
  return (
    <section id="strategy" className="sp-section sp-strategy">
      <div className="sp-container">
        <div className="sp-glass-card sp-strategy-card">
          <div className="sp-strategy-grid">
            <div>
              <h2>Our "Outcome-Oriented" <br />3-2-1 Recovery Loop</h2>
              <div className="sp-steps">
                {steps.map(s => (
                  <div key={s.n} className="sp-step">
                    <div className="sp-step-num">{s.n}</div>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-orbit-wrap">
              <div className="sp-orbit-outer">
                <div className="sp-orbit-mid">
                  <div className="sp-orbit-core">
                    <Icon name="refresh-cw" className="sp-orbit-icon" />
                  </div>
                </div>
              </div>
              <span className="sp-annotation sp-ann-top">Storage Media: NVMe Flash &amp; Immutable S3</span>
              <span className="sp-annotation sp-ann-bottom">Always 3 total copies</span>
              <span className="sp-annotation sp-ann-right">Offsite: Cloud Vault</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  const stats = [
    { val: 'L90d', label: 'Retention of last 90 Days of data (recommended)' },
    { val: '100%', label: 'Ransomware Immunity with Object Lock' },
    { val: '60%',  label: 'Lower TCO vs. Secondary Sites' },
    { val: '<15m', label: 'Average Recovery Point Objective window' },
  ];
  return (
    <section id="outcomes" className="sp-section sp-outcomes">
      <div className="sp-container">
        <div className="sp-section-header sp-light">
          <h2>Outcome-Oriented Protection</h2>
          <p>We don't just backup data; we restore business functions.</p>
        </div>
        <div className="sp-stats-grid">
          {stats.map(s => (
            <div key={s.val} className="sp-stat-card">
              <div className="sp-stat-val">{s.val}</div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="sp-glass-card sp-cta-card">
          <div className="sp-cta-text">
            <h3>Secure Your Tomorrow, Today.</h3>
            <p>Our experts provide a 24/7 managed DRaaS response team that takes the burden off your IT staff during a crisis.</p>
          </div>
          <button className="sp-cta-btn" onClick={() => window.open('https://calendly.com/itstusharpandey/30min', '_blank')}>Get a Free Risk Assessment</button>
        </div>
      </div>
    </section>
  );
}

function ServicesFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-icons">
        <Icon name="twitter" /><Icon name="linkedin" /><Icon name="mail" />
        <a href="mailto:info@NServetechnology.com">info@NServetechnology.com</a>
      </div>
      <p>© 2026 NServe Technologies. Safeguarding businesses against the unpredictable.</p>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <div className="sp-root">
      <div className="sp-orb sp-orb-1" />
      <div className="sp-orb sp-orb-2" />
      <ServicesNav />
      <HeroSection />
      <ThreatsSection />
      <StrategySection />
      <OutcomesSection />
      <ServicesFooter />
    </div>
  );
}
