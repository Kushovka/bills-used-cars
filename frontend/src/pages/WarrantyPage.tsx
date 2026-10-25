import { FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { WarrantyRequestDialog } from '../components/WarrantyRequestDialog'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const steps = [
  ['Ask About the Vehicle', 'When you find a vehicle you’re interested in, ask our team about its available warranty coverage. Not all vehicles include a warranty, and coverage varies by vehicle.'],
  ['Review Coverage Details', 'We’ll go over the specific terms, duration, and what’s included for that vehicle. Our team will explain the details in plain language.'],
  ['Understand What’s Included', 'Review covered components, exclusions, and any conditions before you make a decision. Vehicle-specific terms are provided by our team.'],
  ['Drive with Confidence', 'If the vehicle includes a warranty, keep its written terms handy and contact our local team with questions.'],
]

const faqs = [
  ['Do all vehicles come with a warranty?', 'No. Warranty availability and terms vary by vehicle. Ask us about the specific vehicle you’re considering.'],
  ['How long does coverage last?', 'Qualifying pre-owned vehicles include a 90-day / 3,000-mile limited warranty. It ends after 90 calendar days or 3,000 additional miles, whichever comes first. Check the written warranty for details.'],
  ['What should I do if I have a question about my warranty?', 'Call or visit our team. We can help explain the vehicle-specific terms and next steps.'],
  ['Can I review the terms before purchase?', 'Yes. Ask us to review the applicable warranty terms, conditions, and exclusions with you.'],
  ['Do you offer service after the sale?', 'Contact our team and we’ll be happy to discuss your question and the terms that apply to your vehicle.'],
]

export const WarrantyPage = () => {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return <>
    <Seo title="Warranty Information" description={`Learn about warranty coverage at ${business.name} and ask our team about a specific vehicle.`} />
    <main className="warranty-page warranty-reference">
      <div className="warranty-reference__wrap">
        <section className="wr-intro" aria-labelledby="warranty-title">
          <div className="wr-intro__copy">
            <h1 id="warranty-title">Warranty Information</h1>
            <p>At Bill’s Used Cars, qualifying vehicles include a 90-day / 3,000-mile limited warranty. Coverage details, terms, and availability vary by vehicle, so we encourage you to ask about the specific vehicle you’re interested in. Our team is happy to walk you through the applicable terms and answer your questions.</p>
            <span className="wr-rule" />
            <em>Good Vehicles. Good People. A Stronger Community.</em>
          </div>
          <aside className="wr-contact-card">
            <h2>Questions about coverage?</h2>
            <p>We’re here to help. Give us a call or reach out about a specific vehicle to learn more about available warranty options.</p>
            <a className="wr-phone" href={business.phoneHref}><FaPhone aria-hidden="true" /> {business.phoneDisplay}</a>
            <a className="wr-button wr-button--red" href={business.phoneHref}><FaPhone aria-hidden="true" /> Call Us</a>
            <button type="button" className="wr-button wr-button--outline" onClick={() => { trackContactCta('contact_form_click', 'Warranty Page Ask About a Vehicle'); setQuoteOpen(true) }}><FaEnvelope aria-hidden="true" /> Ask About a Vehicle</button>
          </aside>
        </section>

        <section className="wr-process" aria-labelledby="wr-process-title">
          <div className="wr-process__copy">
            <h2 id="wr-process-title">How Our Warranty Works</h2>
            <p className="wr-section-lead">The warranty process at Bill’s Used Cars is simple and straightforward. Here’s how it works:</p>
            <ol className="wr-steps">{steps.map(([title, copy], index) => <li key={title}><span><b>{index + 1}</b></span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
          </div>
          <aside className="wr-help">
            <img src="/images/warranty-mechanic-repair.webp" alt="Mechanic repairing a vehicle in a service shop" />
            <div className="wr-help__body">
              <h3>Need Help?</h3>
              <p>Have questions about warranty coverage for a specific vehicle? Give us a call or stop by the dealership. We’re always happy to help.</p>
              <p className="wr-address"><FaMapMarkerAlt aria-hidden="true" /> <span>{business.address}<br />{business.cityState} {business.postalCode}</span></p>
              <a className="wr-phone" href={business.phoneHref}><FaPhone aria-hidden="true" /> {business.phoneDisplay}</a>
              <Link className="wr-button wr-button--red" to="/contact">Contact Us <FaArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>
        </section>

        <section className="wr-coverage" aria-labelledby="wr-coverage-title">
          <div className="wr-coverage__main">
            <h2 id="wr-coverage-title">What May Be Covered</h2>
            <p>Qualifying vehicles include a limited warranty for specified major mechanical components. Exact coverage depends on the vehicle and its written warranty. Ask us to review the details for the vehicle you’re interested in.</p>
            <div className="wr-table" role="table" aria-label="Warranty component coverage details">
              {[
                ['Engine', 'Coverage is limited to components specified in the applicable written warranty.'],
                ['Transmission', 'Refer to the vehicle’s written warranty for covered components and terms.'],
                ['Drivetrain', 'Coverage depends on the vehicle and the applicable written warranty.'],
                ['Additional Components', 'The written warranty identifies covered items, limits, conditions, and exclusions.'],
              ].map(([name, text]) => <div className="wr-table__row" role="row" key={name}><strong role="cell">{name}</strong><span role="cell">{text}</span></div>)}
            </div>
          </div>
          <aside className="wr-notes">
            <h2>Important Notes</h2>
            <ul>
              <li>Warranty availability varies by vehicle. Not all vehicles include a warranty.</li>
              <li>Qualifying pre-owned vehicle coverage ends after 90 days or 3,000 additional miles, whichever comes first.</li>
              <li>Terms, conditions, limitations, and exclusions apply. Review the written warranty for complete details.</li>
              <li>Normal wear items and routine maintenance are generally not covered.</li>
              <li>Our team is happy to answer your questions about coverage for a specific vehicle.</li>
            </ul>
          </aside>
        </section>

        <section className="wr-confidence" aria-labelledby="wr-confidence-title">
          <h2 id="wr-confidence-title">Buying with Confidence</h2>
          <p>A quality used vehicle is about more than just the price. It’s about finding the right vehicle and feeling good about your purchase.</p>
          <div className="wr-benefits">
            <article><h3>More Clarity</h3><p>We’ll explain the available coverage in plain language, so you know what’s included.</p></article>
            <article><h3>Straightforward Communication</h3><p>Our team takes time to answer your questions and review the details before you buy.</p></article>
            <article><h3>Peace of Mind</h3><p>A limited warranty can provide added confidence as you get back on the road.</p></article>
            <article><h3>Local Support</h3><p>You’re working with a local, family-run dealership that’s here before and after the sale.</p></article>
          </div>
        </section>

        <section className="wr-faq" aria-labelledby="wr-faq-title">
          <div className="wr-faq__copy"><span className="wr-eyebrow">Common Questions</span><h2 id="wr-faq-title">Warranty FAQs</h2><p>Here are some of the most common questions we get about warranty coverage. Still have a question? Give us a call. We’re happy to help.</p></div>
          <div className="wr-faq__items">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </main>
    <WarrantyRequestDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} />
  </>
}
