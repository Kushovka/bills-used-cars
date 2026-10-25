import { useState } from 'react'
import { FaArrowRight, FaCheck, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { business } from '../data/business'

const steps = [
  ['Talk with Us', "Let us know the vehicle you're interested in and your delivery location. We'll confirm availability and provide a quote."],
  ['Prepare Your Vehicle', "Once everything is set, we'll complete any final inspections and get your vehicle ready for delivery."],
  ['Coordinate Delivery', "We'll work with you to schedule a convenient delivery time, either through our team or a trusted transport partner."],
  ['Receive Your Vehicle', "Your vehicle will be delivered to your location, and we'll make sure you have everything you need to get on the road."],
]

const beforeDelivery = [
  'Final payment must be completed before delivery.',
  "We'll confirm your delivery address and best contact number.",
  'Someone (18 or older) must be present to receive the vehicle.',
  "We'll provide an estimated delivery date and keep you updated along the way.",
  "Delivery fees vary based on distance and vehicle. We'll give you a quote up front so there are no surprises.",
]

const arrivalDetails = [
  'Arrive at your location during the scheduled time window.',
  'Provide the keys, title (if applicable), and any related documents.',
  'Give you time to inspect the vehicle.',
  'Be available to answer any basic questions about the delivery.',
]

const questions = [
  ['How much does delivery cost?', 'Delivery cost depends on the distance, vehicle, and current carrier availability. Call us with your location and we will provide a quote.'],
  ['What types of vehicles can be delivered?', 'We can arrange delivery for most cars, trucks, and SUVs in our inventory. Ask us about a specific vehicle.'],
  ['How long does delivery take?', 'Timing depends on your location and carrier availability. We will share an estimated delivery date when we prepare your quote.'],
  ['Do I need to be present for delivery?', 'You or another person age 18 or older should be present to receive and inspect the vehicle.'],
  ['Do you deliver out of state?', 'Yes. We deliver throughout Massachusetts and can coordinate delivery to many nearby states. Contact us with your ZIP code.'],
  ['Can I schedule delivery for a specific date?', 'We will do our best to work around your preferred date. Scheduling depends on the route and transport availability.'],
]

const CheckList = ({ items }: { items: string[] }) => <ul className="delivery-checklist">{items.map((item) => <li key={item}><FaCheck aria-hidden="true" />{item}</li>)}</ul>

export const DeliveryPage = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const talkLink = `tel:${business.phone.replace(/[^+\d]/g, '')}`

  return <>
    <Seo title="Vehicle Delivery" description="Bill's Used Cars offers convenient vehicle delivery throughout Massachusetts and nearby states. Contact us for a delivery quote." />
    <main className="delivery-page">
      <section className="delivery-hero">
        <div className="delivery-hero-copy">
          <h1>Vehicle Delivery</h1>
          <h2>Delivery That Fits Your Schedule.</h2>
          <p className="delivery-hero-description">At Bill&apos;s Used Cars, we make it easy to get your next vehicle with convenient delivery options. Whether you&apos;re nearby in Massachusetts or a few states away, we&apos;ll work with you to find the best and most affordable way to get your vehicle to you.</p>
        </div>
          <img className="delivery-hero-image" src="/images/delivery-reference-hero.webp" alt="A red pickup truck on a vehicle transport trailer" />
        <aside className="delivery-contact-card">
          <h3>Talk to Us About Delivery</h3>
          <p>Delivery availability depends on distance and vehicle. Call us to discuss your specific needs and get a quote.</p>
          <a className="delivery-phone" href={talkLink}><FaPhoneAlt aria-hidden="true" />{business.phoneDisplay}</a>
          <p className="delivery-hours">Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat–Sun: Closed</p>
          <a className="delivery-button delivery-button--red" href={talkLink}>Talk About Delivery <FaArrowRight aria-hidden="true" /></a>
        </aside>
      </section>

      <section className="delivery-process delivery-wrap">
        <div className="delivery-audience">
          <span className="delivery-eyebrow">Simple. Straightforward.</span>
          <h2>Who Delivery Is For</h2>
          <p>Our delivery service is a great option for customers who can&apos;t make it to the dealership, have a busy schedule, or are purchasing a vehicle from out of town. We regularly deliver vehicles throughout Massachusetts and to nearby states, and we&apos;ll always do our best to accommodate your needs.</p>
          <img src="/images/delivery-reference-audience.webp" alt="Pickup trucks secured on a vehicle transport trailer" />
        </div>
        <div className="delivery-steps">
          <h2>How Delivery Works</h2>
          <p className="delivery-section-intro">We keep the process simple and transparent from start to finish.</p>
          <ol>{steps.map(([title, description], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="delivery-area delivery-wrap">
        <div className="delivery-area-copy">
          <span className="delivery-eyebrow">Delivery Area</span>
          <h2>Serving Massachusetts and Beyond</h2>
          <p>We offer vehicle delivery throughout Massachusetts and to many nearby states, including New Hampshire, Rhode Island, Connecticut, New York, and parts of Vermont and Maine. Delivery availability depends on distance, vehicle, and current scheduling, so please call us to discuss your specific location.</p>
          <a className="delivery-button delivery-button--red" href={talkLink}>Get a Delivery Quote <FaArrowRight aria-hidden="true" /></a>
        </div>
        <img className="delivery-area-map" src="/images/delivery-service-area.webp" alt="Map showing Bill's Used Cars in Baldwinville, Massachusetts, and the surrounding New England delivery area" />
        <aside className="delivery-area-list"><h3>Common Delivery Areas</h3><p>Massachusetts<br />New Hampshire<br />Rhode Island<br />Connecticut<br />New York<br />Vermont (select areas)<br />Maine (select areas)</p><small>Not sure if we deliver to your area? Give us a call, and we&apos;re happy to check your location.</small></aside>
      </section>

      <section className="delivery-checks delivery-wrap">
        <div><span className="delivery-eyebrow">Before We Deliver</span><h2>A Few Things to Know</h2><p>To help ensure a smooth delivery, here are a few important details:</p><CheckList items={beforeDelivery} /></div>
        <div><span className="delivery-eyebrow">When Your Vehicle Arrives</span><h2>What to Expect</h2><p>When your vehicle is delivered, our driver (or transport partner) will:</p><CheckList items={arrivalDetails} /><p className="delivery-last-note">If you have any questions during the delivery process, just give us a call. We&apos;re here to make it a simple and positive experience.</p></div>
      </section>

      <section className="delivery-faq-section delivery-wrap">
        <div className="delivery-faq-heading"><span className="delivery-eyebrow">FAQ</span><h2>Common Questions</h2><p>Here are answers to some of the most common questions about vehicle delivery.</p></div>
        <div className="delivery-faq-grid">{questions.map(([question, answer], index) => <div className="delivery-faq-item" key={question}><button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span>{question}</span><span aria-hidden="true">{openQuestion === index ? '−' : '+'}</span></button>{openQuestion === index && <p>{answer}</p>}</div>)}</div>
      </section>

      <section className="delivery-final-cta">
        <div className="delivery-final-copy"><span>Have a question about delivery?</span><h2>Let&apos;s Talk About Your Delivery Needs.</h2><p>Call us or send us a message and we&apos;ll be happy to discuss your delivery options and provide a quote for your specific location.</p></div>
        <a className="delivery-final-phone" href={talkLink}><FaPhoneAlt aria-hidden="true" /><strong>{business.phoneDisplay}</strong><span>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat–Sun: Closed</span></a>
        <Link className="delivery-button delivery-button--red" to="/contact">Contact Us About Delivery <FaArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  </>
}
