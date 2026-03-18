import { useRef, useEffect, useState } from 'react';

export default function Contact() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://NServetechnology.com/forms/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(form).toString(),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className={`section-header fade-up${visible ? ' visible' : ''}`}>
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>
        <div className={`contact-grid fade-up${visible ? ' visible delay-200' : ''}`}>
          <div className="info-grid">
            <div className="info-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4154f1" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <h3>Address</h3>
              <p>FDRK 0460, Compass Building, Al Sohada Road, Al Hamara Industrial Zone FZ, Ras Al Khaimah, UAE</p>
            </div>
            <div className="info-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4154f1" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <h3>Email Us</h3>
              <p><strong>Email:</strong> <a href="mailto:info@NServetechnology.com">info@NServetechnology.com</a></p>
            </div>
            <div className="info-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4154f1" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <h3>Website</h3>
              <p><a href="http://NServetechnology.com/">NServetechnology.com</a></p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required className="form-full" />
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Message" required className="form-full" />
              <div className="form-full" style={{ textAlign: 'center' }}>
                {status === 'success' && <div className="form-status success">Your message has been sent. Thank you!</div>}
                {status === 'error' && <div className="form-status error">Something went wrong. Please try again.</div>}
                {status === 'loading' && <div className="form-status" style={{ background: '#eee' }}>Sending...</div>}
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
