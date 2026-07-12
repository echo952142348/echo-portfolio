import refHero from '../assets/reference-art/ref-01-full.webp'
import refAbout from '../assets/reference-art/ref-02-full.webp'
import refProjects from '../assets/reference-art/ref-03-full.webp'
import refStrengths from '../assets/reference-art/ref-04-full.webp'
import refContact from '../assets/reference-art/ref-05-full.webp'
import heroCleanVisual from '../assets/visual-art/hero-clean-visual.png'
import aboutCleanVisual from '../assets/visual-art/about-clean-visual.png'
import projectsCleanVisual from '../assets/visual-art/projects-clean-visual.png'
import capabilitiesCleanVisual from '../assets/visual-art/capabilities-clean-visual.png'
import contactCleanVisual from '../assets/visual-art/contact-clean-visual.png'
import heroGlass from '../assets/visual-art/hero-glass-visual.webp'
import heroSphere from '../assets/visual-art/hero-sphere-visual.webp'
import heroCreamSphere from '../assets/visual-art/hero-cream-sphere-visual.webp'
import aboutGlass from '../assets/visual-art/about-glass-visual.webp'
import aboutCreamSphere from '../assets/visual-art/about-cream-sphere-visual.webp'
import projectsGlass from '../assets/visual-art/projects-glass-visual.webp'
import capabilitiesRing from '../assets/visual-art/capabilities-ring-visual.webp'
import capabilitiesSphere from '../assets/visual-art/capabilities-sphere-visual.webp'
import contactGlassBuilding from '../assets/visual-art/contact-building-visual.webp'
import contactSphere from '../assets/visual-art/contact-sphere-visual.webp'

export const visualArtworkConfig = {
  hero: {
    cleanAsset: heroCleanVisual,
    regionAssets: [
      { src: heroGlass, className: 'reference-art-hero-glass' },
      { src: heroSphere, className: 'reference-art-hero-sphere' },
      { src: heroCreamSphere, className: 'reference-art-hero-cream' },
    ],
  },
  about: {
    cleanAsset: aboutCleanVisual,
    regionAssets: [
      { src: aboutGlass, className: 'reference-art-about-glass' },
      { src: aboutCreamSphere, className: 'reference-art-about-cream' },
    ],
  },
  projects: {
    cleanAsset: projectsCleanVisual,
    regionAssets: [{ src: projectsGlass, className: 'reference-art-projects-glass' }],
  },
  capabilities: {
    cleanAsset: capabilitiesCleanVisual,
    regionAssets: [
      { src: capabilitiesRing, className: 'reference-art-capabilities-ring' },
      { src: capabilitiesSphere, className: 'reference-art-capabilities-sphere' },
    ],
  },
  contact: {
    cleanAsset: contactCleanVisual,
    regionAssets: [
      { src: contactGlassBuilding, className: 'reference-art-contact-building' },
      { src: contactSphere, className: 'reference-art-contact-sphere' },
    ],
  },
}

const calibrationMap = {
  hero: refHero,
  about: refAbout,
  projects: refProjects,
  strengths: refStrengths,
  contact: refContact,
}

const variantAliases = {
  strengths: 'capabilities',
}

function getCalibrationOpacity() {
  if (typeof window === 'undefined') return 0

  const value = new URLSearchParams(window.location.search).get('debugReference')
  if (value === null || value === '0') return 0

  const opacity = Number(value)
  return [0.25, 0.5, 0.75, 1].includes(opacity) ? opacity : 0.5
}

export default function ReferenceArtwork({ variant }) {
  const artwork = visualArtworkConfig[variantAliases[variant] || variant]
  const calibrationOpacity = getCalibrationOpacity()
  const calibrationSrc = calibrationMap[variant]
  const cleanAsset = artwork?.cleanAsset
  const regionAssets = artwork?.regionAssets || []

  return (
    <div
      className={`reference-art-layer reference-art-${variant}${cleanAsset ? ' has-clean-artwork' : ''}`}
      aria-hidden="true"
    >
      {calibrationOpacity > 0 && calibrationSrc ? (
        <img
          className="reference-art-image reference-art-calibration"
          src={calibrationSrc}
          alt=""
          key={`${variant}-calibration`}
          draggable="false"
          style={{ '--reference-opacity': calibrationOpacity }}
        />
      ) : null}
      {cleanAsset ? (
        <picture className="reference-art-clean-source">
          <source media="(min-width: 1025px)" srcSet={cleanAsset} />
          <img
            className="reference-art-image reference-art-clean"
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            alt=""
            draggable="false"
            decoding="async"
          />
        </picture>
      ) : null}
      {cleanAsset
        ? null
        : regionAssets.map((item) => (
            <img
              className={`reference-art-image reference-art-region ${item.className}`}
              src={item.src}
              alt=""
              key={item.src}
              draggable="false"
              decoding="async"
            />
          ))}
    </div>
  )
}
