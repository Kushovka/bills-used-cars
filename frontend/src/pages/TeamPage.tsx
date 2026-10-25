import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { teamPortraits } from '../data/team'
import { trackContactCta } from '../utils/ctaTracking'

export const TeamPage = () => (
  <main className="team-page">
    <Seo title="Our Team" description="Meet the people who make Bill's Used Cars a friendly place to find and service a vehicle." />
    <section className="team-section" aria-labelledby="team-title">
      <div className="team-intro">
        <div className="team-intro-copy">
          <h1 id="team-title">The People at<br />Bill’s Used Cars</h1>
          <p className="team-intro-description">A local team that takes pride in helping our customers find the right vehicle and keep it running for the road ahead.</p>
        </div>
        <aside className="team-visit-panel" aria-label="Visit or call Bill's Used Cars">
          <FaMapMarkerAlt className="team-visit-icon" aria-hidden="true" />
          <div className="team-visit-copy">
            <span>Visit Us</span>
            <address>{business.address}<br />{business.cityState} {business.postalCode}</address>
          </div>
          <a href={business.phoneHref} className="team-visit-phone" onClick={() => trackContactCta('phone_click', 'Our Team Visit Us')}>
            <FaPhoneAlt aria-hidden="true" /> {business.phoneDisplay}<span aria-hidden="true">›</span>
          </a>
          <p>Call us with any questions. We’re always happy to help.</p>
        </aside>
      </div>
      <div className="team-gallery">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {teamPortraits.map((member, index) => (
            <article key={member.src} className="team-member-card group">
              <div className="team-member-photo team-portrait relative aspect-[20/21] overflow-hidden">
                <img src={member.src} alt={member.alt} loading={index > 3 ? 'lazy' : 'eager'} className="team-member-portrait absolute inset-0 h-full w-full object-cover object-center" />
              </div>
              <div className="team-member-caption">
                <h2>{member.name}</h2>
                <p>{member.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="team-promise" aria-labelledby="team-promise-title">
      <div className="team-promise-inner">
        <h2 id="team-promise-title">A Straightforward Team You Can Count On</h2>
        <div className="team-promise-points">
          <article><h3>Local and Accessible</h3><p>Real people, right here in Baldwinville.</p></article>
          <article><h3>Honest Answers</h3><p>Straight talk and no runaround.</p></article>
          <article><h3>Support After the Sale</h3><p>We’re here when you need us.</p></article>
        </div>
      </div>
    </section>
  </main>
)
