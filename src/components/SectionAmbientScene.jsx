const sceneSpheres = {
  about: ['about-blue-large', 'about-cream-top', 'about-light-small'],
  projects: ['projects-blue-top', 'projects-light-gap', 'projects-cream-large'],
  strengths: ['strengths-cream-top', 'strengths-light-mid', 'strengths-blue-bottom'],
  contact: ['contact-cream-top', 'contact-blue-large'],
}

export default function SectionAmbientScene({ variant }) {
  const spheres = sceneSpheres[variant] || []

  return (
    <div className={`section-ambient-scene section-ambient-${variant}`} aria-hidden="true">
      {spheres.map((sphere) => (
        <span className={`section-sphere-layer section-sphere-layer-${sphere}`} key={sphere}>
          <span className={`section-sphere section-sphere-${sphere}`} />
        </span>
      ))}
    </div>
  )
}
