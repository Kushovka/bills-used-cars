import { useState } from 'react'
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { business } from '../data/business'

const values = [
  { title: 'Straightforward Sales', text: 'No pressure, no gimmicks. We take the time to answer your questions and give you the information you need to make a confident decision.' },
  { title: 'Quality Pre-Owned Vehicles', text: 'We carefully select the vehicles on our lot and aim to offer clean, well-maintained options at fair prices.' },
  { title: 'Local Service', text: "We live and work here, and we're committed to serving Baldwinville and the surrounding communities with honest deals and friendly service." },
  { title: 'A Practical Buying Experience', text: "Whether you're looking for a reliable daily driver, a truck for work, or a family vehicle, we'll help you find the right fit for your needs and budget." },
]

const faqs = [
  { question: 'Do your vehicles come with a warranty?', answer: 'Warranty availability and terms vary by vehicle. Qualifying vehicles include a 90-day / 3,000-mile limited warranty. Ask us about the specific vehicle and its written terms.' },
  { question: 'Can I trade in my current vehicle?', answer: 'Contact us with a few details about your vehicle and we can discuss your trade-in with you.' },
  { question: 'Do you accept out-of-state buyers?', answer: 'Yes. Contact us before your visit and we can help with questions about buying from out of state.' },
]

const hours = <>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat–Sun: Closed</>

export const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return <main className="about-page about-reference">
    <Seo title="About Bill's Used Cars" description="Meet Bill's Used Cars, a local dealership serving Baldwinville and nearby communities." />

    <section className="ar-hero ar-frame">
      <div className="ar-hero-copy">
        <h1>About Bill’s Used Cars</h1>
        <h2>A local dealership serving Baldwinville and nearby communities.</h2>
        <p>Bill’s Used Cars is a family-run dealership offering a selection of quality used cars, trucks, and SUVs at fair prices. We’re proud to be part of the Baldwinville community and to help local drivers find dependable vehicles for work, family, and everyday life.</p>
        <p className="ar-tagline">Good Vehicles. Good People. A Stronger Community.</p>
      </div>
      <img className="ar-hero-photo" src="/images/bills-used-cars-hero-desktop.webp" srcSet="/images/bills-used-cars-hero-mobile.webp 480w, /images/bills-used-cars-hero-tablet.webp 960w, /images/bills-used-cars-hero-desktop.webp 1440w" sizes="(max-width: 900px) 100vw, 50vw" width="1440" height="810" alt="Bill’s Used Cars dealership on Maple Street" fetchPriority="high" decoding="async" />
      <aside className="ar-visit-card">
        <h3>Visit Our Dealership</h3>
        <p><FaMapMarkerAlt /><span><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong><small>Serving Baldwinville and nearby communities.</small></span></p>
        <p><FaClock /><span><strong>Hours</strong><small>{hours}</small></span></p>
        <Link className="ar-button ar-button--red" to="/inventory">View Inventory <FaArrowRight /></Link>
        <a className="ar-button ar-button--outline" href={business.mapsUrl} target="_blank" rel="noreferrer"><FaMapMarkerAlt /> Get Directions</a>
      </aside>
    </section>

    <section className="ar-values ar-band">
      <div className="ar-values-intro"><h2>What Matters Here</h2><i /><p>We believe car buying should be straightforward and stress-free. Here’s what you can expect at Bill’s Used Cars.</p></div>
      {values.map((value) => <article key={value.title}><h3>{value.title}</h3><p>{value.text}</p></article>)}
    </section>

    <section className="ar-how ar-frame">
      <img src="/images/about-work-trucks.webp" alt="A row of pre-owned trucks and SUVs on a sunny dealership lot" />
      <div><h2>How We Work</h2><i /><p>We focus on offering a selection of reliable, well-maintained used vehicles that meet the needs of local drivers. Our inventory includes cars, trucks, and SUVs from a variety of makes and models, and we regularly inspect the vehicles we take in to help ensure they’re in good condition.</p><p>We believe in honest communication and a straightforward process. Our team is here to answer your questions, provide vehicle history information, and help you understand your options. We’ll work with you to find a vehicle that fits your needs, whether you’re upgrading, buying your first car, or adding a truck to your business.</p><p>At Bill’s Used Cars, our goal is to help you make the right choice.</p></div>
    </section>

    <section className="ar-dealership ar-band">
      <div className="ar-dealership-copy"><h2>A Look at the Dealership</h2><i /><p>Our dealership is conveniently located on Maple Street in Baldwinville. Stop by to take a look at our current inventory in person, meet our team, and see what makes Bill’s Used Cars a trusted part of the community.</p></div>
      <img src="/images/bills-used-cars-visit-1440.webp" srcSet="/images/bills-used-cars-visit-480.webp 480w, /images/bills-used-cars-visit-960.webp 960w, /images/bills-used-cars-visit-1440.webp 1440w" sizes="50vw" width="1440" height="810" alt="The Bill’s Used Cars lot in Baldwinville" loading="lazy" decoding="async" />
      <img src="/images/bills-used-cars-hero-desktop.webp" srcSet="/images/bills-used-cars-hero-mobile.webp 480w, /images/bills-used-cars-hero-tablet.webp 960w, /images/bills-used-cars-hero-desktop.webp 1440w" sizes="50vw" width="1440" height="810" alt="Bill’s Used Cars dealership sign and entrance" loading="lazy" decoding="async" />
    </section>

    <section className="ar-local ar-frame">
      <div className="ar-local-copy"><h2>Serving Baldwinville</h2><i /><p>We’re proud to be a local business, serving drivers in Baldwinville and the surrounding towns. Our convenient location on Maple Street makes it easy to stop by, take a look at our inventory, and get the help you need.</p></div>
      <div className="ar-contact-card">
        <p><FaMapMarkerAlt /><span><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong><small>Serving Baldwinville and nearby communities.</small></span></p>
        <a href={business.phoneHref}><FaPhoneAlt /><strong>{business.phoneDisplay}</strong></a>
        <p><FaClock /><span><strong>Hours</strong><small>{hours}</small></span></p>
      </div>
      <a className="ar-map" href={business.mapsUrl} target="_blank" rel="noreferrer" aria-label="Open directions to Bill’s Used Cars"><iframe title={`Map to ${business.name}`} src={business.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></a>
    </section>

    <section className="ar-faq ar-band">
      <div className="ar-faq-copy"><h2>Frequently Asked Questions</h2><i /><p>Here are answers to some common questions about buying from Bill’s Used Cars. If you have a question that’s not listed here, feel free to give us a call.</p></div>
      <div className="ar-faq-list">{faqs.map(({ question, answer }, index) => <article key={question} className={openFaq === index ? 'is-open' : ''}>
        <h3><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span aria-hidden="true">{openFaq === index ? '−' : '+'}</span></button></h3>
        {openFaq === index && <p>{answer}</p>}
      </article>)}</div>
    </section>
  </main>
}
