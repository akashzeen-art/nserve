import { useRef, useEffect, useState } from 'react';

const values = [
  {
    img: '/img/values-1.png',
    title: 'Direct Carrier Billing',
    desc: 'Direct Carrier Billing (DCB) is an online mobile payment method that allows users to make purchases directly charged to their mobile phone bill or prepaid SIM card. DCB works across all mobile devices and is accessible to any user having a subscription or prepaid plan with a telecom operator.',
  },
  {
    img: '/img/values-2.png',
    title: 'Digital Marketing',
    desc: 'Digital marketing involves leveraging online channels like social media, search engines, email, and websites to promote brands, engage audiences, and drive conversions. It uses strategies like SEO, content marketing, and paid ads to boost online visibility and attract potential customers.',
  },
  {
    img: '/img/values-3.png',
    title: 'IT Solutions and Services',
    desc: 'IT solutions and services encompass a range of technologies and support that help businesses manage, optimize, and secure their digital infrastructure. This includes software development, network management, cloud services, cybersecurity, and technical support.',
  },
];

export default function Values() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="values" className="values" ref={ref}>
      <div className="container">
        <div className="section-header">
          <p>Features</p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className={`value-box fade-up${visible ? ` visible delay-${(i + 1) * 200}` : ''}`}>
              <img src={v.img} alt={v.title} />
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
