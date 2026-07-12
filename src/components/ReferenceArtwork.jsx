import { useEffect, useState } from 'react'
import heroCleanVisual from '../assets/visual-art/hero-clean-desktop.webp'
import aboutCleanVisual from '../assets/visual-art/about-clean-desktop.webp'
import projectsCleanVisual from '../assets/visual-art/projects-clean-desktop.webp'
import capabilitiesCleanVisual from '../assets/visual-art/capabilities-clean-desktop.webp'
import contactCleanVisual from '../assets/visual-art/contact-clean-desktop.webp'
import heroCleanMobile from '../assets/visual-art/hero-clean-mobile.webp'
import aboutCleanMobile from '../assets/visual-art/about-clean-mobile.webp'
import projectsCleanMobile from '../assets/visual-art/projects-clean-mobile.webp'
import capabilitiesCleanMobile from '../assets/visual-art/capabilities-clean-mobile.webp'
import contactCleanMobile from '../assets/visual-art/contact-clean-mobile.webp'

export const visualArtworkConfig = {
  hero: {
    cleanAsset: heroCleanVisual,
    mobileAsset: heroCleanMobile,
  },
  about: {
    cleanAsset: aboutCleanVisual,
    mobileAsset: aboutCleanMobile,
  },
  projects: {
    cleanAsset: projectsCleanVisual,
    mobileAsset: projectsCleanMobile,
  },
  capabilities: {
    cleanAsset: capabilitiesCleanVisual,
    mobileAsset: capabilitiesCleanMobile,
  },
  contact: {
    cleanAsset: contactCleanVisual,
    mobileAsset: contactCleanMobile,
  },
}

const calibrationLoaders = {
  hero: () => import('../assets/reference-art/ref-01-full.webp'),
  about: () => import('../assets/reference-art/ref-02-full.webp'),
  projects: () => import('../assets/reference-art/ref-03-full.webp'),
  strengths: () => import('../assets/reference-art/ref-04-full.webp'),
  contact: () => import('../assets/reference-art/ref-05-full.webp'),
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
  const [calibrationSrc, setCalibrationSrc] = useState('')
  const cleanAsset = artwork?.cleanAsset
  const mobileAsset = artwork?.mobileAsset

  useEffect(() => {
    let isMounted = true

    if (calibrationOpacity <= 0) {
      setCalibrationSrc('')
      return undefined
    }

    const loadCalibration = calibrationLoaders[variant]

    if (!loadCalibration) {
      setCalibrationSrc('')
      return undefined
    }

    loadCalibration().then((module) => {
      if (isMounted) {
        setCalibrationSrc(module.default)
      }
    })

    return () => {
      isMounted = false
    }
  }, [calibrationOpacity, variant])

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
          {mobileAsset ? <source media="(max-width: 1024px)" srcSet={mobileAsset} /> : null}
          <source media="(min-width: 1025px)" srcSet={cleanAsset} />
          <img
            className="reference-art-image reference-art-clean"
            src={cleanAsset}
            alt=""
            draggable="false"
            width="2048"
            height="1152"
            loading={variant === 'hero' ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={variant === 'hero' ? 'high' : 'auto'}
          />
        </picture>
      ) : null}
    </div>
  )
}
