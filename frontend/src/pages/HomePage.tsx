import { Seo } from '../components/Seo'
import { autoDealerSchema } from '../utils/schema'
import { Link, useLocation, useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaChevronDown, FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { getVehicleFilters, listVehicles } from '../api/vehicles'
import type { Vehicle } from '../types/vehicle'
import { InventoryVehicleCard } from '../components/InventoryVehicleCard'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const bodyTypeLabels: Record<string, string> = {
  Convertible: 'Convertibles',
  Coupe: 'Coupes',
  Sedan: 'Sedans',
  SUV: 'SUVs',
  Truck: 'Trucks',
  Van: 'Vans',
}

export const HomePage = () => {
  const { hash } = useLocation()
  const [filters, setFilters] = useState<{ makes: string[]; models: string[]; bodyTypes: string[] }>({ makes: [], models: [], bodyTypes: [] })
  const [allModels, setAllModels] = useState<string[]>([])
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [price, setPrice] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    getVehicleFilters()
      .then((available) => {
        if (!active) return
        setFilters({ makes: available.makes, models: available.models, bodyTypes: available.bodyTypes })
        setAllModels(available.models)
      })
      .catch(() => undefined)

    return () => { active = false }
  }, [])

  const initialMakeFilter = useRef(true)
  useEffect(() => {
    if (initialMakeFilter.current) {
      initialMakeFilter.current = false
      return
    }
    if (!make) {
      setFilters((current) => ({ ...current, models: allModels }))
      return
    }
    let active = true
    getVehicleFilters(make)
      .then(({ models }) => { if (active) setFilters((current) => ({ ...current, models })) })
      .catch(() => { if (active) setFilters((current) => ({ ...current, models: [] })) })
    return () => { active = false }
  }, [make, allModels])

  useEffect(() => {
    if (hash !== '#hero-search') return
    requestAnimationFrame(() => {
      const search = document.getElementById('hero-search')
      search?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      search?.querySelector('input')?.focus({ preventScroll: true })
    })
  }, [hash])

  return (
  <>
    <Seo
      title="Used Cars in Baldwinville, MA"
      description="Shop quality pre-owned cars, trucks, and SUVs at Bill's Used Cars."
      schema={autoDealerSchema}
    />
    <section className="reference-home-hero" aria-labelledby="home-title">
      <div className="reference-home-hero__copy">
        <p className="reference-home-hero__eyebrow">Quality Vehicles <i /> Honest Deals <i /> Local People</p>
        <h1 id="home-title">Reliable Used Cars in Baldwinville</h1>
        <p className="reference-home-hero__description">At Bill’s Used Cars, we offer a great selection of quality used cars, trucks, and SUVs at fair prices. We’re a local, family-run dealership serving Baldwinville and the surrounding communities with honest deals and friendly service.</p>
        <p className="reference-home-hero__motto">Good Vehicles. Good People. A Stronger Community.</p>
      </div>
      <div className="reference-home-hero__photo-space"><img src="/images/bills-used-cars-hero-desktop.webp" srcSet="/images/bills-used-cars-hero-mobile.webp 480w, /images/bills-used-cars-hero-tablet.webp 960w, /images/bills-used-cars-hero-desktop.webp 1440w" sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 44.6vw" width="1440" height="810" alt="Bill’s Used Cars dealership and vehicle lot in Baldwinville" fetchPriority="high" decoding="async" /></div>
      <aside className="reference-home-hero__visit">
        <p className="reference-home-hero__eyebrow">Visit Our Dealership</p>
        <div className="reference-home-hero__fact"><FaMapMarkerAlt aria-hidden="true" /><span><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong><em>Serving Baldwinville and nearby communities.</em></span></div>
        <div className="reference-home-hero__fact"><FaClock aria-hidden="true" /><span><strong>Hours</strong><em>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat–Sun: Closed</em></span></div>
        <a className="reference-home-hero__primary" href="/inventory">View Inventory <FaArrowRight aria-hidden="true" /></a>
        <a className="reference-home-hero__secondary" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Homepage Hero Directions')}><FaMapMarkerAlt aria-hidden="true" /> Get Directions</a>
      </aside>
    </section>
    <section id="hero-search" className="reference-inventory-search" aria-label="Search our inventory">
      <div className="reference-inventory-search__intro"><h2>Search Our Inventory</h2><p>Find the right vehicle for your needs.</p></div>
      <form className="reference-inventory-search__form" onSubmit={(event) => { event.preventDefault(); const params = new URLSearchParams(); if (make) params.set('make', make); if (model) params.set('model', model); if (bodyType) params.set('bodyType', bodyType); if (price) { const [min, max] = price.split(':'); if (min) params.set('priceMin', min); if (max) params.set('priceMax', max) } navigate(`/inventory${params.size ? `?${params}` : ''}`) }}>
        <label>Make<select value={make} onChange={(event) => { setMake(event.target.value); setModel('') }}><option value="">All Makes</option>{filters.makes.map((item) => <option key={item}>{item}</option>)}</select><FaChevronDown aria-hidden="true" /></label>
        <label>Model<select value={model} onChange={(event) => setModel(event.target.value)}><option value="">All Models</option>{filters.models.map((item) => <option key={item}>{item}</option>)}</select><FaChevronDown aria-hidden="true" /></label>
        <label>Body Type<select value={bodyType} onChange={(event) => setBodyType(event.target.value)}><option value="">All Body Types</option>{filters.bodyTypes.map((item) => <option key={item}>{item}</option>)}</select><FaChevronDown aria-hidden="true" /></label>
        <label>Price<select value={price} onChange={(event) => setPrice(event.target.value)}><option value="">Any Price</option><option value=":19999">Under $20,000</option><option value="20000:40000">$20,000–$40,000</option><option value="40001:60000">$40,000–$60,000</option><option value="60001:">Over $60,000</option></select><FaChevronDown aria-hidden="true" /></label>
        <button type="submit">Search Inventory <FaArrowRight aria-hidden="true" /></button>
      </form>
    </section>
    <FeaturedVehicles bodyTypes={filters.bodyTypes} />
    <AboutBillSection />
    <div className="home-section-divider" aria-hidden="true" />
    <CustomerReviewsSection />
    <div className="home-section-divider" aria-hidden="true" />
    <VisitDealershipSection />
  </>
  )
}

const FeaturedVehicles = ({ bodyTypes }: { bodyTypes: string[] }) => {
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(0)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 820px)').matches)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const pageSize = isMobile ? 1 : 4
  const orderedBodyTypes = [...bodyTypes].sort((a, b) => Number(b.toLowerCase() === 'truck') - Number(a.toLowerCase() === 'truck'))
  const selectedCategory = orderedBodyTypes.find((item) => item === category) ?? orderedBodyTypes[0] ?? ''
  const categoryVehicles = vehicles.filter((vehicle) =>
    vehicle.bodyType.toLowerCase() === selectedCategory.toLowerCase()
      && vehicle.images.some((image) => !image.includes('vehicle-photo-coming-soon')),
  )
  const pageCount = Math.max(1, Math.ceil(categoryVehicles.length / pageSize))
  const pageVehicles = categoryVehicles.slice(page * pageSize, (page + 1) * pageSize)
  const changeCategory = (nextCategory: string) => { setCategory(nextCategory); setPage(0) }
  const changePage = (nextPage: number) => setPage(Math.max(0, Math.min(pageCount - 1, nextPage)))
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) { touchStart.current = null; return }
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    touchStart.current = null
    const end = event.changedTouches[0]
    if (!start || !end) return
    const deltaX = end.clientX - start.x
    const deltaY = end.clientY - start.y
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return
    changePage(page + (deltaX < 0 ? 1 : -1))
  }
  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)')
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
      setPage(0)
    }
    media.addEventListener('change', handleViewportChange)
    return () => media.removeEventListener('change', handleViewportChange)
  }, [])

  useEffect(() => {
    let active = true
    const loadInventory = async () => {
      try {
        const firstPage = await listVehicles({ page: 1, pageSize: 50, sort: 'year_desc' })
        const remainingPages = await Promise.all(
          Array.from(
            { length: Math.max(0, Math.ceil(firstPage.total / firstPage.pageSize) - 1) },
            (_, index) => listVehicles({ page: index + 2, pageSize: 50, sort: 'year_desc' }),
          ),
        )
        if (!active) return
        setVehicles([...firstPage.items, ...remainingPages.flatMap((response) => response.items)])
      } catch {
        if (!active) return
        setVehicles([])
      } finally {
        if (active) setLoading(false)
      }
    }
    void loadInventory()
    return () => { active = false }
  }, [])

  return (
    <section className="featured-stock" aria-labelledby="featured-stock-title">
      <div className="featured-stock__inner">
        <div className="featured-stock__top">
          <div className="featured-stock__heading">
            <h2 id="featured-stock-title">Vehicles on the Lot</h2>
            <p className="featured-stock__description">Take a look at some of our current inventory. Quality used cars, trucks, and SUVs at fair prices.</p>
          </div>
          <div className="featured-stock__controls">
            <div className="featured-stock__controls-top">
              <div className="featured-stock__tabs" role="tablist" aria-label="Filter vehicles by body type">
                {orderedBodyTypes.map((item) => {
                  const label = bodyTypeLabels[item] ?? item
                  return <button key={item} type="button" role="tab" aria-selected={selectedCategory === item} className={selectedCategory === item ? 'is-active' : ''} onClick={() => changeCategory(item)}>{label}</button>
                })}
              </div>
              <Link to="/inventory" className="featured-stock__all-link">View All Inventory <FaArrowRight aria-hidden="true" /></Link>
            </div>
            <div className="featured-stock__arrows" aria-label="Vehicle pages">
              <button type="button" aria-label="Previous vehicles" onClick={() => changePage(page - 1)} disabled={page === 0}><FaChevronLeft aria-hidden="true" /></button>
              <button type="button" aria-label="Next vehicles" onClick={() => changePage(page + 1)} disabled={page >= pageCount - 1}><FaChevronRight aria-hidden="true" /></button>
            </div>
          </div>
        </div>
        <div className="featured-stock__grid inventory-vehicle-grid" role="region" aria-label={`${selectedCategory} in inventory`} aria-live="polite" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {loading ? <p className="featured-stock__empty">Loading vehicles…</p>
            : pageVehicles.length ? pageVehicles.map((vehicle) => <InventoryVehicleCard key={vehicle.id} vehicle={vehicle} />)
              : <p className="featured-stock__empty">No {(bodyTypeLabels[selectedCategory] ?? selectedCategory).toLowerCase()} are currently listed. <Link to="/inventory">Browse all inventory</Link></p>}
        </div>
        <div className="featured-stock__pagination" aria-live="polite"><i aria-hidden="true" /><span>{String(page + 1).padStart(2, '0')} <b>/</b> {String(pageCount).padStart(2, '0')}</span><i aria-hidden="true" /></div>
      </div>
    </section>
  )
}

const AboutBillSection = () => (
  <section className="about-bill" aria-labelledby="about-bill-title">
    <div className="about-bill__inner">
      <img className="about-bill__photo" src="/images/bills-used-cars-about-1440.webp" srcSet="/images/bills-used-cars-about-480.webp 480w, /images/bills-used-cars-about-960.webp 960w, /images/bills-used-cars-about-1440.webp 1440w" sizes="(max-width: 900px) 100vw, 50vw" width="1440" height="810" alt="Bill’s Used Cars dealership, lot, and roadside landscaping in Baldwinville" loading="lazy" decoding="async" />
      <div className="about-bill__copy">
        <p className="about-bill__eyebrow">About Bill’s</p>
        <h2 id="about-bill-title">A Local Dealership.<br />Right Here in Baldwinville.</h2>
        <p>Bill’s Used Cars is a family-run dealership offering a selection of quality used cars, trucks, and SUVs at fair prices. We’re proud to serve Baldwinville and the surrounding communities.</p>
        <p>Whether you’re looking for a reliable daily driver, a truck for work, or a family vehicle, we’re here to help you find the right fit.</p>
        <Link to="/about" className="about-bill__link">More About Bill’s <FaArrowRight aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
)

const homeReviews = [
  { author: 'Michael R.', rating: 5, text: 'Stopped by to look at a couple of cars and ended up finding one that worked for me. Nobody was pushy, and I had time to look everything over. Pretty straightforward experience.' },
  { author: 'David T.', rating: 5, text: 'Bought a used truck here a few weeks ago. They answered my questions, let me take my time checking it out, and the paperwork was simple enough. No complaints so far.' },
  { author: 'Susan M.', rating: 5, text: 'Small place, but that’s actually what I liked about it. Didn’t have to deal with a bunch of salespeople. Found a car I liked, took it for a drive, and worked things out without any hassle.' },
]

const CustomerReviewsSection = () => (
  <section className="customer-reviews" aria-labelledby="customer-reviews-title">
    <div className="customer-reviews__inner">
      <div className="customer-reviews__topline">
        <h2 id="customer-reviews-title">What Our Customers Say</h2>
        <a href={business.reviewsUrl} target="_blank" rel="noreferrer">View More Reviews <FaArrowRight aria-hidden="true" /></a>
      </div>
      <p className="customer-reviews__intro">Real feedback from drivers in Baldwinville and nearby communities.</p>
      <div className="customer-reviews__grid">
        {homeReviews.map((review) => (
          <article className="customer-review-card" key={review.text}>
            <div className="customer-review-card__stars" role="img" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}</div>
            <blockquote className="customer-review-card__quote">“{review.text}”</blockquote>
            <div className="customer-review-card__attribution"><h3>{review.author}</h3></div>
          </article>
        ))}
      </div>
      <div className="customer-reviews__photos" aria-label="Customer delivery photos">
        <img src="/images/customer-delivery-01.webp?v=5" width="1600" height="1200" alt="Customer standing beside a white sedan" loading="lazy" decoding="async" />
        <img src="/images/customer-delivery-05.webp?v=2" width="1672" height="941" alt="Customers with their blue Dodge at the dealership" loading="lazy" decoding="async" />
        <img src="/images/customer-delivery-03.webp?v=4" width="1372" height="984" alt="Customers with their dog beside their Ram truck" loading="lazy" decoding="async" />
        <img src="/images/customer-delivery-04.webp?v=3" width="1246" height="818" alt="Customer with her Chevrolet at the dealership" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
)

const VisitDealershipSection = () => (
  <section className="visit-dealership" aria-labelledby="visit-dealership-title">
    <div className="visit-dealership__copy">
      <p className="visit-dealership__eyebrow">Visit Our Dealership</p>
      <h2 id="visit-dealership-title">Stop By and<br />See Us in<br />Baldwinville.</h2>
      <p className="visit-dealership__intro">We’re conveniently located on Maple Street in Baldwinville, Massachusetts. Feel free to stop by, take a look at our inventory in person, and let us know how we can help.</p>
      <dl className="visit-dealership__details">
        <div><dt><FaMapMarkerAlt aria-hidden="true" /><span>Address</span></dt><dd>{business.address}<br />{business.cityState} {business.postalCode}</dd></div>
        <div><dt><FaPhoneAlt aria-hidden="true" /><span>Phone</span></dt><dd><a href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Homepage Visit Dealership')}>{business.phoneDisplay}</a></dd></div>
        <div><dt><FaClock aria-hidden="true" /><span>Hours</span></dt><dd>Mon – Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM<br />Sat – Sun: Closed</dd></div>
      </dl>
      <div className="visit-dealership__actions">
        <a className="visit-dealership__directions" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Homepage Visit Dealership Directions')}>Get Directions <FaArrowRight aria-hidden="true" /></a>
        <a className="visit-dealership__call" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Homepage Visit Dealership Call')}><FaPhoneAlt aria-hidden="true" /> Call Us</a>
      </div>
    </div>
    <div className="visit-dealership__visual">
      <img className="visit-dealership__photo" src="/images/bills-used-cars-visit-1440.webp" srcSet="/images/bills-used-cars-visit-480.webp 480w, /images/bills-used-cars-visit-960.webp 960w, /images/bills-used-cars-visit-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 50vw" width="1440" height="810" alt="Bill’s Used Cars viewed from the road in Baldwinville" loading="lazy" decoding="async" />
      <div className="visit-dealership__map-card">
        <div className="visit-dealership__map-address"><FaMapMarkerAlt aria-hidden="true" /><p><strong>{business.address}, {business.cityState} {business.postalCode}</strong><span>Serving Baldwinville and nearby communities.</span></p></div>
        <div className="visit-dealership__map-preview"><iframe title="Map to Bill’s Used Cars" src={business.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        <a href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Homepage Visit Dealership Map')}>View on Map <FaArrowRight aria-hidden="true" /></a>
      </div>
    </div>
  </section>
)
