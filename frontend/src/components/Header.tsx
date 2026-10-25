import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { FaArrowRight, FaBars, FaChevronDown, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaRegCommentDots, FaSearch, FaTimes } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { createPortal } from 'react-dom'
import { listVehicles } from '../api/vehicles'
import { business } from '../data/business'
import type { Vehicle } from '../types/vehicle'
import { trackContactCta } from '../utils/ctaTracking'
import { formatPrice } from '../utils/format'
import { HeaderMessageDialog } from './HeaderMessageDialog'

const desktopNavItems = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Delivery', href: '/delivery' },
]

const mobileNavItems = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Delivery', href: '/delivery' },
]

export const HeaderSearch = ({ variant = 'header' }: { variant?: 'header' | 'hero' }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const term = query.trim()
    if (term.length < 2) {
      setMatches([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    listVehicles({ q: term, pageSize: 3 })
      .then((response) => { if (!cancelled) setMatches(response.items) })
      .catch(() => { if (!cancelled) setMatches([]) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [query])

  const viewSearch = () => {
    const term = query.trim()
    if (term) navigate(`/inventory?q=${encodeURIComponent(term)}`)
  }

  return <div id={variant === 'hero' ? 'hero-search' : undefined} className={`relative w-full ${variant === 'hero' ? 'max-w-none scroll-mt-6' : '2xl:max-w-[560px]'}`}>
    <div className={`header-search-control flex items-center gap-0 overflow-hidden transition-colors ${variant === 'hero' ? 'h-[50px] rounded-[7px] border border-[#d4d4d4] bg-white shadow-sm focus-within:border-[#777]' : 'h-[49px] rounded-[8px] border border-[#d2cfcd] bg-[#fbfaf8] focus-within:border-[#a9a3a0]'}`}>
    <label className="relative flex h-full min-w-0 flex-1 items-center gap-3 pl-3 2xl:gap-4 2xl:pl-4">
      <span className="sr-only">Search inventory</span>
      <FaSearch aria-hidden="true" className={`shrink-0 text-[16px] ${variant === 'hero' ? 'text-[#999]' : 'text-[var(--color-button)] 2xl:text-[19px]'}`} />
      <input
        className={`h-9 min-w-0 w-full bg-transparent py-0 pr-1 text-[#1C2B3E] outline-none placeholder:text-[#77716e] ${variant === 'hero' ? 'text-[15px]' : 'text-[13px] 2xl:text-[14px]'}`}
        type="text"
        inputMode="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); viewSearch() } if (event.key === 'Escape') setQuery('') }}
        placeholder={variant === 'hero' ? 'Search by make, model, or body style' : 'Search make, model, or keyword...'}
      />
      {query ? <button type="button" aria-label="Clear inventory search" onClick={() => setQuery('')} className="grid h-9 w-9 shrink-0 place-items-center text-base text-[#77716e] transition hover:text-[#1C2B3E]"><FaTimes aria-hidden="true" /></button> : null}
    </label>
    {variant === 'header' ? <button type="button" onClick={viewSearch} className="header-search-submit inline-flex h-full shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[var(--color-button)] px-4 text-[12px] font-bold text-white transition hover:bg-[var(--color-button-hover)] sm:px-5 2xl:px-6 2xl:text-[13px]">Search <FaArrowRight aria-hidden="true" className="text-[12px]" /></button> : null}
    </div>
    {query.trim().length >= 2 ? <div role="region" aria-label="Vehicle search results" className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 max-h-[min(360px,calc(100dvh-7rem))] w-full overflow-y-auto rounded-xl border border-[#dedede] bg-white text-[#242424] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
      <div className="flex min-h-11 items-center justify-between border-b border-[#e8e8e8] bg-[#f7f7f7] px-4 sm:px-5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5c5c5c]">{loading ? 'Searching inventory' : `${matches.length} ${matches.length === 1 ? 'matching vehicle' : 'matching vehicles'}`}</span><span className="h-2 w-2 rounded-full bg-[#A54438]" aria-hidden="true" /></div>
      {loading ? <p className="px-5 py-6 text-sm text-[#666]">Looking through current inventory…</p> : matches.length ? <><div className="divide-y divide-[#e8e8e8]">{matches.map((vehicle) => {
        const photo = vehicle.images[0]
        const hasPhoto = Boolean(photo && !photo.includes('vehicle-photo-coming-soon'))
        return <Link key={vehicle.id} to={`/inventory/${vehicle.slug}`} onClick={() => setQuery('')} className="group grid min-h-[88px] grid-cols-[72px_minmax(0,1fr)] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#f8f6f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#A54438] sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5 sm:py-3">
          <img src={hasPhoto ? photo : '/images/vehicle-photo-coming-soon-card.webp'} alt="" className="h-[54px] w-[72px] rounded-md border border-[#e4e4e4] bg-[#f5f5f5] object-cover sm:h-[68px] sm:w-[104px]" />
          <span className="min-w-0 text-left"><strong className="line-clamp-2 text-[14px] font-bold leading-tight text-[#242424] sm:line-clamp-1 sm:text-[16px]">{vehicle.year} {vehicle.make} {vehicle.model}</strong><span className="mt-1 block truncate text-[12px] text-[#666] sm:text-[13px]">{vehicle.trim || vehicle.bodyType || 'Available now'}</span><span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#85372F] sm:hidden">{formatPrice(vehicle.price)}</span></span>
          <span className="hidden items-center gap-3 pl-2 text-right sm:flex"><span className="whitespace-nowrap text-[16px] font-bold tabular-nums text-[#A54438]">{formatPrice(vehicle.price)}</span><FaArrowRight aria-hidden="true" className="text-[12px] text-[#A54438] transition-transform group-hover:translate-x-1" /></span>
        </Link>
      })}</div><button type="button" onClick={viewSearch} className="header-search-browse-all flex min-h-11 w-full items-center justify-between border-t border-[#e8e8e8] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#A54438] transition-colors hover:bg-[#A54438] hover:text-white sm:px-5"><span>Browse all matching vehicles</span><FaArrowRight aria-hidden="true" /></button></> : <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5"><div className="min-w-0 text-left"><strong className="block text-[14px] font-bold text-[#242424] sm:text-[15px]">No vehicles found for “{query.trim()}”</strong><span className="mt-1 block text-[12px] leading-5 text-[#666] sm:text-[13px]">Try another search or browse the full inventory.</span></div><Link to="/inventory" onClick={() => setQuery('')} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#A54438] px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#85372F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A54438]"><span>View all inventory</span><FaArrowRight aria-hidden="true" /></Link></div>}
    </div> : null}
  </div>
}

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [showCompactHeader, setShowCompactHeader] = useState(false)
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  const showPromoBar = false
  const phoneHref = business.phoneHref || business.contactHref
  const displayPhone = business.phoneDisplay

  useEffect(() => {
    const desktopCompactHeader = window.matchMedia('(min-width: 761px)')
    const onScroll = () => setShowCompactHeader(desktopCompactHeader.matches && window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    desktopCompactHeader.addEventListener('change', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      desktopCompactHeader.removeEventListener('change', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])


  return (
    <>
    <motion.header
      id="site-header"
      className="reference-home-header relative z-40"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div className="reference-utility-bar">
        <span className="reference-utility-hours"><FaClock aria-hidden="true" /><span>Mon–Thu: 8:00 AM – 7:00 PM <i /> Fri: 8:00 AM – 6:00 PM <i /> Sat–Sun: Closed</span></span>
        <a className="reference-utility-address" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Top Bar Directions')}><FaMapMarkerAlt aria-hidden="true" /><span>{business.address}, {business.cityState} {business.postalCode}</span></a>
      </div>

      <div className="reference-main-nav mx-auto grid min-h-[128px] max-w-[1800px] grid-cols-[minmax(250px,1fr)_auto_minmax(250px,1fr)] items-center gap-x-5 px-[clamp(28px,3vw,48px)]">
        <Link
          to="/"
          className="flex min-w-0 items-center focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)]"
          onClick={() => setOpen(false)}
        >
          <img className="reference-dealer-logo" src="/images/bills-used-cars-logo.webp" alt={business.name} />
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-[clamp(20px,1.5vw,30px)] xl:flex xl:w-full">
          {desktopNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `header-nav-link whitespace-nowrap text-[16px] font-bold uppercase transition ${
                  isActive
                    ? 'text-[#A54438]'
                    : 'text-[#1C2B3E] hover:text-[#A54438]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="group relative flex h-full items-center" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
            <button type="button" aria-expanded={aboutDropdownOpen} onClick={() => setAboutDropdownOpen((value) => !value)} onKeyDown={(event) => { if (event.key === 'Escape') setAboutDropdownOpen(false) }} className={`header-nav-link inline-flex items-center gap-1 whitespace-nowrap !text-[18px] font-bold uppercase transition ${pathname === '/about' || pathname === '/team' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}>
              About <FaChevronDown aria-hidden="true" className={`text-[9px] transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full z-50 min-w-[150px] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-lg transition duration-150 ${aboutDropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'}`}>
              <NavLink to="/about" onClick={() => setAboutDropdownOpen(false)} className={({ isActive }) => `block px-3 py-2.5 text-[16px] font-bold transition ${isActive ? 'bg-[var(--color-background)] text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)]'}`}>About</NavLink>
              <NavLink to="/team" onClick={() => setAboutDropdownOpen(false)} className={({ isActive }) => `block px-3 py-2.5 text-[16px] font-bold transition ${isActive ? 'bg-[var(--color-background)] text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)]'}`}>Our Team</NavLink>
            </div>
          </div>
          <NavLink to="/contact" className={({ isActive }) => `header-nav-link whitespace-nowrap text-[16px] font-bold uppercase transition ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}>Contact</NavLink>
        </nav>

        <div className="flex h-full items-center justify-self-end gap-5">
          <a className="reference-main-call hidden xl:flex" href={phoneHref} onClick={() => trackContactCta('phone_click', 'Site Header Call')}><span>Call Us Today</span><strong><FaPhoneAlt aria-hidden="true" />{displayPhone}</strong><em>Friendly Service. Fair Prices.</em></a>
          <div className="flex items-center gap-2.5 xl:hidden">
            <button
              aria-label="Open message form"
              className="grid h-10 w-10 place-items-center border border-[#1C2B3E] text-[#1C2B3E] transition hover:text-[#A54438]"
              onClick={() => { setMessageOpen(true); trackContactCta('message_click', 'Mobile Header Message') }}
              type="button"
            >
              <FaRegCommentDots aria-hidden="true" className="text-[19px]" />
            </button>
            <button
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center border border-[#1C2B3E] text-[#1C2B3E]"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {showPromoBar ? <div className="home-promo-bar"><span>Check Out Our Latest Selection of Quality Pre-Owned Vehicles!</span><Link to="/inventory">View Inventory</Link></div> : null}

      {createPortal(<AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-menu-backdrop fixed inset-0 z-[100] flex items-stretch justify-center bg-[#F5F3EE] p-0 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(event) => { if (event.target === event.currentTarget) setOpen(false) }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="mobile-menu-panel flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#F5F3EE] text-[#1C2B3E]"
              initial={{ y: reduceMotion ? 0 : '100%' }}
              animate={{ y: 0 }}
              exit={{ y: reduceMotion ? 0 : '100%' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-menu-head flex shrink-0 items-start justify-between">
                <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
                  <img className="reference-dealer-logo" src="/images/bills-used-cars-logo.webp" alt={business.name} />
                </Link>
                <button
                  aria-label="Close menu"
                  className="mobile-menu-close grid h-12 w-12 shrink-0 place-items-center text-[36px] text-[#1C2B3E] transition hover:text-[#A54438] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A54438]"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <FaTimes />
                </button>
              </div>

              <nav aria-label="Main navigation" className="mobile-menu-nav shrink-0">
                {mobileNavItems.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item group flex min-h-[72px] items-center justify-between border-b text-left transition"
                  >
                    <span>{label}</span>
                    <FiChevronRight aria-hidden="true" className="mobile-menu-arrow h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                ))}
                <div className="mobile-menu-about border-b">
                  <button type="button" aria-expanded={aboutDropdownOpen} onClick={() => setAboutDropdownOpen((value) => !value)} className="mobile-menu-item group flex min-h-[72px] w-full items-center justify-between text-left transition" aria-current={pathname === '/about' || pathname === '/team' ? 'page' : undefined}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 700, letterSpacing: '-.035em', lineHeight: 1 }}>About</span>
                    <FiChevronRight aria-hidden="true" className={`mobile-menu-arrow h-7 w-7 shrink-0 transition-transform ${aboutDropdownOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {aboutDropdownOpen ? <div className="mobile-menu-subnav flex gap-7 pb-4">
                    <NavLink to="/about" onClick={() => setOpen(false)}>About Us</NavLink>
                    <NavLink to="/team" onClick={() => setOpen(false)}>Our Team</NavLink>
                  </div> : null}
                </div>
                <NavLink to="/contact" onClick={() => setOpen(false)} className="mobile-menu-item group flex min-h-[72px] items-center justify-between border-b text-left transition">
                  <span>Contact</span>
                  <FiChevronRight aria-hidden="true" className="mobile-menu-arrow h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </nav>

              <div className="mobile-menu-footer mt-auto shrink-0">
                <a href={phoneHref} className="mobile-menu-phone flex min-h-[64px] items-center justify-center gap-4 rounded-[10px] px-4 text-center" onClick={() => { setOpen(false); trackContactCta('phone_click', 'Mobile Menu Contact') }}>
                  <FaPhoneAlt aria-hidden="true" className="shrink-0 text-[24px]" />
                  <span>{displayPhone}</span>
                </a>
                <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="mobile-menu-address flex items-center gap-4" onClick={() => { setOpen(false); trackContactCta('directions_click', 'Mobile Menu Directions') }}>
                  <FaMapMarkerAlt aria-hidden="true" className="shrink-0 text-[23px]" />
                  <span>{business.address}, {business.cityState} {business.postalCode}</span>
                </a>
                <div className="mobile-menu-hours flex items-start gap-4">
                  <FaClock aria-hidden="true" className="mt-1 shrink-0 text-[24px]" />
                  <span>Mon–Thu: 8:00 AM – 7:00 PM<br />Fri: 8:00 AM – 6:00 PM <i /> Sat–Sun: Closed</span>
                </div>
                <div className="mobile-menu-actions grid grid-cols-2 gap-3">
                  <Link to="/inventory" onClick={() => setOpen(false)} className="mobile-menu-inventory inline-flex min-h-[58px] items-center justify-between gap-2 rounded-[9px] px-3 font-bold" >View Inventory <FaChevronDown aria-hidden="true" className="-rotate-90 shrink-0" /></Link>
                  <a href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => { setOpen(false); trackContactCta('directions_click', 'Mobile Menu Get Directions') }} className="mobile-menu-directions inline-flex min-h-[58px] items-center justify-between gap-2 rounded-[9px] px-3 font-bold">Get Directions <FaChevronDown aria-hidden="true" className="-rotate-90 shrink-0" /></a>
                </div>
              </div>

            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>, document.body)}
    </motion.header>
    <AnimatePresence initial={false}>
      {showCompactHeader ? <motion.div
        key="compact-header"
        className="compact-header fixed inset-x-0 top-0 z-[60] border-b border-[#d8d2c8] bg-[#F5F3EE] shadow-[0_3px_10px_rgba(28,43,62,0.03)]"
        initial={{ y: reduceMotion ? 0 : -96, opacity: reduceMotion ? 1 : 0.98 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduceMotion ? 0 : -76, opacity: reduceMotion ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid h-[76px] max-w-[1800px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 px-[clamp(22px,3vw,48px)]">
          <Link to="/" aria-label="Bill's Used Cars home" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}>
            <img src="/images/bills-used-cars-logo.webp" alt="" className="compact-header__logo" />
          </Link>
          <nav aria-label="Compact navigation" className="hidden min-w-0 items-center justify-center gap-[clamp(14px,1.5vw,28px)] xl:flex">
            {desktopNavItems.map((item) => <NavLink key={item.href} to={item.href} className={({ isActive }) => `whitespace-nowrap text-[20px] font-bold uppercase transition ${isActive ? 'text-[#A54438]' : 'text-[#1C2B3E] hover:text-[#A54438]'}`}>{item.label}</NavLink>)}
            <div className="group relative flex h-full items-center" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
              <button type="button" aria-expanded={aboutDropdownOpen} onClick={() => setAboutDropdownOpen((value) => !value)} className={`inline-flex items-center gap-1 whitespace-nowrap text-[20px] font-bold uppercase transition ${pathname === '/about' || pathname === '/team' ? 'text-[#A54438]' : 'text-[#1C2B3E] hover:text-[#A54438]'}`}>
                About <FaChevronDown aria-hidden="true" className={`text-[9px] transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute left-0 top-full z-50 min-w-[150px] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-lg transition duration-150 ${aboutDropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'}`}>
                <NavLink to="/about" onClick={() => setAboutDropdownOpen(false)} className={({ isActive }) => `block px-3 py-2.5 text-[15px] font-bold transition ${isActive ? 'bg-[var(--color-background)] text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)]'}`}>About</NavLink>
                <NavLink to="/team" onClick={() => setAboutDropdownOpen(false)} className={({ isActive }) => `block px-3 py-2.5 text-[15px] font-bold transition ${isActive ? 'bg-[var(--color-background)] text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)]'}`}>Our Team</NavLink>
              </div>
            </div>
            <NavLink to="/contact" className={({ isActive }) => `whitespace-nowrap text-[20px] font-bold uppercase transition ${isActive ? 'text-[#A54438]' : 'text-[#1C2B3E] hover:text-[#A54438]'}`}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <a href={phoneHref} onClick={() => trackContactCta('phone_click', 'Compact Header Phone')} className="hidden items-center gap-2 whitespace-nowrap text-[22px] font-bold text-[#A54438] xl:flex"><FaPhoneAlt aria-hidden="true" />{displayPhone}</a>
            <button type="button" aria-label="Open message form" onClick={() => { setMessageOpen(true); trackContactCta('message_click', 'Compact Header Message') }} className="grid h-10 w-10 place-items-center border border-[#1C2B3E] text-[#1C2B3E] transition hover:text-[#A54438] xl:hidden"><FaRegCommentDots aria-hidden="true" className="text-[19px]" /></button>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center border border-[#1C2B3E] text-[#1C2B3E] xl:hidden">{open ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>
      </motion.div> : null}
    </AnimatePresence>
    <HeaderMessageDialog open={messageOpen} onClose={() => setMessageOpen(false)} />
    </>
  )
}
