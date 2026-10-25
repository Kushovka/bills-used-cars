import { business } from '../data/business'

export const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: business.name,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address,
    addressLocality: 'Baldwinville',
    addressRegion: 'MA',
    postalCode: business.postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.latitude,
    longitude: business.longitude,
  },
  url: business.website || business.mapsUrl,
  image: `${business.website}/images/bills-used-cars-hero-desktop.webp`,
  openingHours: ['Mo-Th 08:00-19:00', 'Fr 08:00-18:00'],
}
