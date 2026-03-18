import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact',  label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('hero');

  /* ── scroll state ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // track active section
      const offsets = NAV_LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);

      const current = offsets.filter(o => o.top <= 120).pop();
      if (current) setActiveId(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-container">

        {/* Logo */}
        <a href="/" className="logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          <img src="/img/logo.png" alt="NServe" />
          <span className="logo-text">NServe</span>
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#about"
            className="btn-getstarted"
            onClick={e => { e.preventDefault(); scrollTo('about'); }}
          >
            Get Started
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id); }}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#about"
              className="btn-getstarted mobile"
              onClick={e => { e.preventDefault(); scrollTo('about'); }}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
