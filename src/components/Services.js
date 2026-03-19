import { useRef, useEffect, useState, useCallback } from 'react';

const services = [
  {
    color: 'blue',
    title: 'Direct Carrier Billing',
    desc: 'Our Direct Carrier Billing (DCB) service allows businesses to offer seamless payment options where users can charge purchases directly to their mobile phone bills. This service simplifies the transaction process for digital content, apps, and services, improving customer experience and expanding your reach to mobile users globally.',
  },
  {
    color: 'orange',
    title: 'Digital Marketing',
    desc: 'We offer comprehensive digital marketing services designed to boost your online presence and drive business growth. Our offerings include search engine optimization (SEO), social media marketing, email marketing, content creation, and paid advertising. Our goal is to increase visibility, attract more traffic, and convert leads into loyal customers.',
  },
  {
    color: 'purple',
    title: 'Video On Demand Services',
    desc: 'nServe operates Video-on-Demand (VOD) digital entertainment platforms that allow users to stream movies, web series, learning videos, documentaries, and other content directly over the internet. Users can watch anytime on smartphones, tablets, smart TVs, and computers, accessing diverse genres including fitness, drama, action, comedy, romance, thriller, and regional entertainment.',
  },
  {
    color: 'green',
    title: 'IT Solutions and Services',
    desc: 'Our IT solutions and services cover everything from custom software development to cloud computing, cybersecurity, and IT infrastructure management. We provide end-to-end support to help businesses streamline operations, enhance security, and implement innovative technologies to achieve their objectives.',
  },
];

const SLIDE_GAP = 24;

function getPerPage() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function Services() {
  const sectionRef = useRef();
  const trackRef = useRef();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [perPage, setPerPage] = useState(getPerPage());
  const [slideWidth, setSlideWidth] = useState(0);

  const maxIndex = services.length - perPage;

  // Intersection observer for fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Calculate slide width from container
  const calcSlideWidth = useCallback(() => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.offsetWidth;
    const totalGap = SLIDE_GAP * (perPage - 1);
    setSlideWidth((containerWidth - totalGap) / perPage);
  }, [perPage]);

  const handleResize = useCallback(() => {
    const pp = getPerPage();
    setPerPage(pp);
    setCurrent(c => Math.min(c, services.length - pp));
  }, []);

  useEffect(() => {
    calcSlideWidth();
    window.addEventListener('resize', calcSlideWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', calcSlideWidth);
      window.removeEventListener('resize', handleResize);
    };
  }, [calcSlideWidth, handleResize]);

  // Recalc after perPage changes
  useEffect(() => { calcSlideWidth(); }, [perPage, calcSlideWidth]);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  const translateX = current * (slideWidth + SLIDE_GAP);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div className={`section-header fade-up${visible ? ' visible' : ''}`}>
          <h2>Services</h2>
          <p>Our services include:</p>
        </div>

        <div className={`services-slider fade-up${visible ? ' visible delay-200' : ''}`}>
          {/* Nav buttons */}
          <div className="services-slider-nav">
            <button
              type="button"
              className={`services-slider-prev${current === 0 ? ' swiper-button-disabled' : ''}`}
              aria-label="Previous slide"
              disabled={current === 0}
              onClick={prev}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              type="button"
              className={`services-slider-next${current >= maxIndex ? ' swiper-button-disabled' : ''}`}
              aria-label="Next slide"
              disabled={current >= maxIndex}
              onClick={next}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          {/* Slides track */}
          <div className="swiper-overflow" ref={trackRef}>
            <div
              className="swiper-wrapper align-items-stretch"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {services.map((s, i) => {
                const isActive = i === current;
                const isNext = i === current + 1;
                return (
                  <div
                    key={i}
                    className={`swiper-slide${isActive ? ' swiper-slide-active' : isNext ? ' swiper-slide-next' : ''}`}
                    role="group"
                    aria-label={`${i + 1} / ${services.length}`}
                    style={{ width: slideWidth > 0 ? slideWidth : undefined, marginRight: SLIDE_GAP }}
                  >
                    <div className={`service-box ${s.color}`}>
                      <i className="ri-discuss-line icon"></i>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
