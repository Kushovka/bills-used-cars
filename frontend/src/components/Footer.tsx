import { Link } from 'react-router'
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const footerLinks = [
  ['Home', '/'],
  ['Inventory', '/inventory'],
  ['About Us', '/about'],
  ['Our Team', '/team'],
  ['Delivery', '/delivery'],
  ['Warranty', '/warranty'],
  ['Contact', '/contact'],
]

export const Footer = () => (
  <footer className="dealer-footer">
    <div className="dealer-footer__main">
      <section className="dealer-footer__intro" aria-label="Bill's Used Cars">
        <Link to="/" className="dealer-footer__logo" aria-label="Bill's Used Cars home">
          <img src="/images/bills-used-cars-logo.webp" alt="Bill's Used Cars" />
        </Link>
        <p>Locally owned and operated, Bill's Used Cars serves Baldwinville and nearby communities with quality pre-owned vehicles and straightforward service.</p>
        <Link to="/inventory" className="dealer-footer__cta" onClick={() => trackContactCta('inventory_click', 'Footer Browse Inventory')}>
          Browse Inventory <FaArrowRight aria-hidden="true" />
        </Link>
      </section>

      <nav className="dealer-footer__links" aria-label="Footer navigation">
        {footerLinks.map(([label, href]) => <Link to={href} key={href}>{label}</Link>)}
      </nav>

      <section className="dealer-footer__contact" aria-label="Contact and hours">
        <h2>Contact</h2>
        <i aria-hidden="true" />
        <a href={business.phoneHref} className="dealer-footer__contact-line" onClick={() => trackContactCta('phone_click', 'Footer Call')}>
          <FaPhoneAlt aria-hidden="true" /><span>{business.phoneDisplay}</span>
        </a>
        <a href={business.mapsUrl} className="dealer-footer__contact-line" target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Footer Address')}>
          <FaMapMarkerAlt aria-hidden="true" /><span>{business.address}<br />{business.cityState} {business.postalCode}</span>
        </a>
        <div className="dealer-footer__hours">
          <h3>Hours</h3>
          <div className="dealer-footer__contact-line"><FaClock aria-hidden="true" /><span>Mon–Thu: 8:00 AM – 7:00 PM<br />Friday: 8:00 AM – 6:00 PM<br />Saturday–Sunday: Closed</span></div>
        </div>
      </section>

      <section className="dealer-footer__map" aria-label="Dealership location map">
        <div className="dealer-footer__map-frame">
          <iframe
            title={`Map to ${business.name} at ${business.address}, ${business.cityState} ${business.postalCode}`}
            src={business.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="dealer-footer__address" onClick={() => trackContactCta('directions_click', 'Footer Map Address')}>
          <FaMapMarkerAlt aria-hidden="true" />
          <span>{business.address}<br />{business.cityState} {business.postalCode}</span>
          <FaArrowRight aria-hidden="true" className="dealer-footer__address-arrow" />
        </a>
      </section>
    </div>

    <div className="dealer-footer__bottom">
      <span>© 2026 Bill&apos;s Used Cars. All rights reserved.</span>
      <div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link></div>
    </div>
  </footer>
)
