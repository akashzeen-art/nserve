import { useRef, useEffect, useState } from 'react';

export default function About() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-row">
          <div className={`about-content fade-up${visible ? ' visible' : ''}`}>
            <h3>About Us</h3>
            <h2>Who we are?</h2>
            <p>
              We provide full spectrum IT solutions to meet the needs of the clients. nServe has the capability to
              offer end‐to‐end system integration solutions custom‐designed to meet all business needs. We have the
              support of global leaders to deliver the latest technologies at competitive prices. We have also
              acquired expert knowledge in several core technologies to offer the right solution to our customers.
            </p>
            <h2>Mission and vision</h2>
            <p>
              Total IT Software Solutions interfaces with clients to identify their requirement and accordingly,
              designs, develops and implements an integrated and comprehensive IT or software based solution. We put
              all of our energy into listening and understanding your needs, developing your custom solution, and
              striving to deliver above and beyond your requirements.
            </p>
          </div>
          <div className={`about-img fade-up${visible ? ' visible delay-200' : ''}`}>
            <img src="/img/about.jpg" alt="About nServe" />
          </div>
        </div>
      </div>
    </section>
  );
}
