export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-row">
          <div className="fade-up visible">
            <h1>We offer modern solutions for growing your business</h1>
            <h2>The simplest form of technology is the development and use of techniques.</h2>
            <button className="btn-get-started" onClick={() => scrollTo('about')}>
              <span>Get Started</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div className="hero-img fade-up visible delay-200">
            <img src="/img/hero-img.png" alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
