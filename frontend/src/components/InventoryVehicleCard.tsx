import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { Vehicle } from '../types/vehicle'
import { formatNumber, formatPrice } from '../utils/format'

const simpleDrivetrain = (value: string) => {
  if (/4wd|four[-\s]?wheel/i.test(value)) return '4WD'
  if (/awd|all[-\s]?wheel/i.test(value)) return 'AWD'
  if (/rwd|rear[-\s]?wheel/i.test(value)) return 'RWD'
  if (/fwd|front[-\s]?wheel/i.test(value)) return 'FWD'
  return value
}

const simpleTransmission = (value: string) => /dual[-\s]?clutch|\bdct\b/i.test(value) ? 'DCT' : value
const uniquePreviewPhotos = (photos: string[]) => [...new Set(photos)].slice(0, 7)

export const InventoryVehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ''}`
  const drivetrain = simpleDrivetrain(vehicle.drivetrain)
  const transmission = simpleTransmission(vehicle.transmission)
  const [photos, setPhotos] = useState(() => uniquePreviewPhotos(vehicle.images))
  const photoContainerRef = useRef<HTMLDivElement>(null)
  const photoCount = photos.length
  const [activePhoto, setActivePhoto] = useState(0)
  const [indicatorStretched, setIndicatorStretched] = useState(false)
  const previousActivePhotoRef = useRef(activePhoto)
  const [photoAspectRatio, setPhotoAspectRatio] = useState(1.5)

  useEffect(() => {
    if (previousActivePhotoRef.current === activePhoto) return
    previousActivePhotoRef.current = activePhoto
    setIndicatorStretched(true)
    const timeout = window.setTimeout(() => setIndicatorStretched(false), 140)
    return () => window.clearTimeout(timeout)
  }, [activePhoto])

  useEffect(() => {
    const initialPhotos = uniquePreviewPhotos(vehicle.images)
    setPhotos(initialPhotos)
    setActivePhoto(0)
  }, [vehicle.id, vehicle.images, vehicle.imagesTotal, vehicle.slug])

  useEffect(() => {
    const container = photoContainerRef.current
    if (!container || photoCount < 2) return

    const preloadAdjacentPhotos = () => {
      const adjacentIndexes = new Set([
        (activePhoto + 1) % photoCount,
        (activePhoto - 1 + photoCount) % photoCount,
      ])
      adjacentIndexes.forEach((index) => {
        const image = new Image()
        image.decoding = 'async'
        image.src = photos[index]
      })
    }

    if (typeof IntersectionObserver === 'undefined') {
      preloadAdjacentPhotos()
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      preloadAdjacentPhotos()
      observer.disconnect()
    }, { rootMargin: '160px' })
    observer.observe(container)
    return () => observer.disconnect()
  }, [activePhoto, photoCount, photos])

  const changePhoto = (event: MouseEvent<HTMLButtonElement>, direction: number) => {
    event.preventDefault()
    event.stopPropagation()
    setActivePhoto((current) => (current + direction + photoCount) % photoCount)
  }
  const activePhotoUrl = photos[activePhoto] || '/images/vehicle-photo-coming-soon-card.webp'
  const teslaPortraitPositions = ['center 80%', 'center 80%', 'center 80%']
  const photoObjectPosition = vehicle.slug === '2021-tesla-model-s-long-range' && activePhoto >= 2 && activePhoto <= 4
    ? teslaPortraitPositions[activePhoto - 2]
    : photoAspectRatio < 0.9 ? 'center 55%' : photoAspectRatio < 1.1 ? 'center 40%' : 'center 72%'

  return <article className="inventory-vehicle-card">
    <div className="inventory-vehicle-card__photo" ref={photoContainerRef}>
      <Link to={`/inventory/${vehicle.slug}`} className="inventory-vehicle-card__photo-link" aria-label={`View ${title}`}>
        <img className="inventory-vehicle-card__photo-backdrop" src={activePhotoUrl} alt="" aria-hidden="true" loading="lazy" />
        <img className="inventory-vehicle-card__photo-main" src={activePhotoUrl} alt={`${title}, photo ${activePhoto + 1}`} loading="lazy" style={{ objectPosition: photoObjectPosition }} onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget
          if (naturalWidth && naturalHeight) setPhotoAspectRatio(naturalWidth / naturalHeight)
        }} />
      </Link>
      {vehicle.stockNumber.trim() ? <span className="inventory-vehicle-card__stock" aria-label={`Stock number ${vehicle.stockNumber}`}>{vehicle.stockNumber}</span> : null}
      {(vehicle.imagesTotal ?? vehicle.images.length) > 1 ? <>
        <button type="button" className="inventory-card-gallery__arrow inventory-card-gallery__arrow--previous" aria-label={`Previous photo of ${title}`} onClick={(event) => changePhoto(event, -1)}><FaChevronLeft aria-hidden="true" /></button>
        <button type="button" className="inventory-card-gallery__arrow inventory-card-gallery__arrow--next" aria-label={`Next photo of ${title}`} onClick={(event) => changePhoto(event, 1)}><FaChevronRight aria-hidden="true" /></button>
      </> : null}
      {photoCount > 1 ? <div className="inventory-card-gallery__dots" role="group" aria-label={`Choose a photo of ${title}`}>
        <span className="inventory-card-gallery__dot-indicator" aria-hidden="true" style={{ transform: `translateX(${activePhoto * 11}px) scaleX(${indicatorStretched ? 1.18 : 1})` }} />
        {photos.map((_, index) => <button key={index} type="button" aria-label={`Show photo ${index + 1} of ${title}`} aria-pressed={activePhoto === index} className={activePhoto === index ? 'is-active' : ''} onClick={() => setActivePhoto(index)} />)}
      </div> : null}
    </div>
    <div className="inventory-vehicle-card__body">
      <h3><Link to={`/inventory/${vehicle.slug}`}>{title}</Link></h3>
      <p className="inventory-vehicle-card__price">{formatPrice(vehicle.price)}</p>
      <p className="inventory-vehicle-card__specs">
        <span>{vehicle.mileage > 0 ? `${formatNumber(vehicle.mileage)} miles` : 'Mileage not listed'}</span>
        {drivetrain ? <span>{drivetrain}</span> : null}
        {transmission ? <span className="inventory-vehicle-card__specs-transmission">{transmission}</span> : null}
      </p>
      <Link className="inventory-vehicle-card__details" to={`/inventory/${vehicle.slug}`}>
        <span>View Vehicle Details</span><FaArrowRight aria-hidden="true" />
      </Link>
    </div>
  </article>
}
