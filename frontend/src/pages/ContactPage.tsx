import { FaArrowRight, FaCheck, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const phoneHref = business.phoneHref || business.contactHref
const reasons = [
  'Ask about a specific vehicle or confirm if it’s still available',
  'Schedule a time to visit and take a vehicle for a test drive',
  'Get more information about our warranty options',
  'Learn about our delivery services',
  'General questions about our inventory or dealership',
]
const questions = [
  ['Do I need an appointment?', 'Appointments are welcome, but you can also stop by during our regular business hours.'],
  ['Can I ask about a specific vehicle?', 'Absolutely. Send us the vehicle details through the form or call us and our team will be glad to help.'],
  ['Do you offer delivery?', 'Contact us to discuss delivery options and availability for your location.'],
  ['Can I call about warranty options?', 'Yes. Call us or send a message and we can answer questions about available warranty options.'],
  ['What are your hours?', 'Monday through Thursday, 8:00 AM–7:00 PM; Friday, 8:00 AM–6:00 PM. Saturday and Sunday we are closed.'],
]

export const ContactPage = () => (
  <main className="contact-page contact-reference">
    <Seo title="Contact" description="Call, visit, or send a message to Bill's Used Cars in Baldwinville, MA." />

    <section className="cr-intro">
      <div className="cr-container">
        <div className="cr-intro-grid">
          <div className="cr-intro-copy">
            <h1>Get in Touch With<br />Bill’s Used Cars</h1>
            <p>We’re here to help. Whether you have a question about a vehicle, want to schedule a visit, or just want to learn more about our local dealership, we’d love to hear from you.</p>
            <p>Give us a call, stop by on Maple Street, or send us a message using the form on this page. We’re a local, family-run dealership, and we’re always happy to talk cars.</p>
            <p className="cr-signoff">Good Vehicles. Good People. A Stronger Community.</p>
          </div>
          <aside className="cr-card cr-reach-card">
            <h2>Best Ways to Reach Us</h2>
            <div className="cr-reach-item"><FaPhoneAlt /><div><a href={phoneHref} onClick={() => trackContactCta('phone_click', 'Contact Page Reach Us')}>{business.phoneDisplay}</a><small>Give us a call – we’re happy to help.</small></div></div>
            <a className="cr-reach-item" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Contact Page Address')}><FaMapMarkerAlt /><div><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong><small>Serving Baldwinville and nearby communities.</small></div></a>
            <div className="cr-reach-item"><FaClock /><div><strong>Hours</strong><small>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat – Sun: Closed</small></div></div>
            <div className="cr-reach-actions"><a className="cr-button cr-button-red" href={phoneHref} onClick={() => trackContactCta('phone_click', 'Contact Page Call Us')}><FaPhoneAlt />Call Us</a><a className="cr-button cr-button-outline" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Contact Page Directions')}><FaMapMarkerAlt />Get Directions</a></div>
          </aside>
        </div>
      </div>
    </section>

    <section className="cr-main-section" aria-label="Contact our team">
      <div className="cr-container cr-main-grid">
        <div className="cr-when">
          <img src="/images/bills-used-cars-visit-1440.webp" srcSet="/images/bills-used-cars-visit-480.webp 480w, /images/bills-used-cars-visit-960.webp 960w, /images/bills-used-cars-visit-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 50vw" width="1440" height="810" alt="Bill’s Used Cars dealership in Baldwinville" loading="lazy" decoding="async" />
          <div className="cr-when-copy">
            <h2>When to Reach Out</h2>
            <p>We’re happy to help with all kinds of questions. Here are a few common reasons people get in touch with us:</p>
            <ul>{reasons.map((reason) => <li key={reason}><FaCheck />{reason}</li>)}</ul>
          </div>
        </div>
        <div className="cr-card cr-form-card">
          <h2>Send Us a Message</h2>
          <p className="cr-form-intro">Fill out the form below and we’ll get back to you as soon as possible, usually within one business day.</p>
          <LeadForm title="Send Message" variant="contact" phonePlaceholder="(978) 555-1234" messagePlaceholder="How can we help you?" showVehicleInterest inquiryLabel="Preferred Contact Method" inquiryOptions={['Phone', 'Text', 'Email']} />
        </div>
      </div>
    </section>

    <section className="cr-visit-section">
      <div className="cr-container cr-visit-grid">
        <div className="cr-visit-copy">
          <h2>Visit or Call: Whatever Works Best</h2>
          <p>You’ll find Bill’s Used Cars on Maple Street in Baldwinville, MA. We’re easy to reach from surrounding towns and always happy to welcome you in person. Prefer to talk first? Give us a call and we’ll be glad to help.</p>
          <div className="cr-visit-details">
            <div className="cr-visit-facts">
              <div><FaMapMarkerAlt /><p><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong><small>Serving Baldwinville and nearby communities.</small></p></div>
              <div><FaPhoneAlt /><p><a href={phoneHref} onClick={() => trackContactCta('phone_click', 'Contact Page Visit Phone')}><strong>{business.phoneDisplay}</strong></a></p></div>
              <div><FaClock /><p><strong>Sales Hours</strong><small>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat – Sun: Closed</small></p></div>
            </div>
            <div className="cr-before"><strong>Before You Visit</strong><ul><li><FaCheck />Feel free to call ahead to confirm vehicle availability.</li><li><FaCheck />Bring any questions about a vehicle, warranty, or delivery.</li><li><FaCheck />We’re happy to set aside time for a test drive.</li></ul><a className="cr-button cr-button-red" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Contact Page Visit Directions')}>View Directions <FaArrowRight /></a></div>
          </div>
        </div>
        <iframe title="Map to Bill’s Used Cars" className="cr-map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={business.mapEmbedUrl} />
      </div>
    </section>

    <section className="cr-faq-section">
      <div className="cr-container cr-faq-grid">
        <div><h2>Frequently Asked<br />Questions</h2><p>Quick answers to common questions about visiting us, our inventory, and how we can help.</p><p>Still have a question? Give us a call at <a href={phoneHref}>{business.phoneDisplay}</a>. We’re happy to help.</p></div>
        <div className="cr-faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>
  </main>
)
