export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <div className="logo">
                <img src="/img/logo.png" alt="NServe" />
                <span>NServe</span>
              </div>
              <p>
                Knowing your customers is an essential part of business planning. The more you know about your customers,
                the more you know about where to find others just like them, how to reach them with media or other
                marketing communications, and what kinds of messages, offers, and incentives move them toward buying.
              </p>
              <div className="social-links">
                <a href="/#" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="/#" aria-label="Facebook">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="/#" aria-label="Instagram">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="/#" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Useful Links</h4>
              <ul>
                {[['hero','Home'],['about','About us'],['services','Services']].map(([id, label]) => (
                  <li key={id}>
                    <svg width="12" height="12" fill="none" stroke="#d0d4fc" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
                  </li>
                ))}
                <li>
                  <svg width="12" height="12" fill="none" stroke="#d0d4fc" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                  <a href="/#">Terms of service</a>
                </li>
                <li>
                  <svg width="12" height="12" fill="none" stroke="#d0d4fc" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                  <a href="/#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Our Services</h4>
              <ul>
                {['Direct Carrier Billing', 'Digital Marketing', 'IT Solutions and Services'].map((s) => (
                  <li key={s}>
                    <svg width="12" height="12" fill="none" stroke="#d0d4fc" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    <a href="/#">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>
                FDRK 0460, Compass Building,<br />
                Al Sohada Road, Al Hamara Industrial Zone FZ,<br />
                Ras Al Khaimah, UAE<br /><br />
                <strong>Email:</strong> info@NServetechnology.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          © Copyright <strong>NServe</strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
