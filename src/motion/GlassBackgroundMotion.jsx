import { memo } from 'react'

function maskUrl(path) {
  return `url("${path}")`
}

const opticalLayers = [
  { name: 'primary', plane: 'edge-core', trackClassName: 'glass-flow__track' },
  { name: 'halo', plane: 'warm-halo', trackClassName: 'glass-response__track' },
  { name: 'dispersion', plane: 'blue-dispersion', trackClassName: 'glass-response__track' },
  { name: 'body', plane: 'body-caustic', trackClassName: 'glass-response__track' },
  { name: 'hotspot', plane: 'hotspot', trackClassName: 'glass-response__track' },
]

function opticalMaskUrl(variant, mask, mode) {
  return maskUrl(`/motion-masks/${variant}-${mask}-${mode}.png`)
}

function GlassBackgroundMotion({ variant, desktopMask, mobileMask }) {
  const maskDebug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('glassMaskDebug') === '1'

  return (
    <div
      className={`glass-motion glass-motion--${variant}`}
      style={{
        '--glass-mask-desktop': maskUrl(desktopMask),
        '--glass-mask-mobile': maskUrl(mobileMask),
        '--edge-primary-mask-desktop': opticalMaskUrl(variant, 'edge-primary', 'desktop'),
        '--edge-primary-mask-mobile': opticalMaskUrl(variant, 'edge-primary', 'mobile'),
        '--edge-halo-mask-desktop': opticalMaskUrl(variant, 'edge-halo', 'desktop'),
        '--edge-halo-mask-mobile': opticalMaskUrl(variant, 'edge-halo', 'mobile'),
        '--body-refraction-mask-desktop': opticalMaskUrl(variant, 'body-refraction', 'desktop'),
        '--body-refraction-mask-mobile': opticalMaskUrl(variant, 'body-refraction', 'mobile'),
        '--hotspot-mask-desktop': opticalMaskUrl(variant, 'hotspot', 'desktop'),
        '--hotspot-mask-mobile': opticalMaskUrl(variant, 'hotspot', 'mobile'),
      }}
      aria-hidden="true"
    >
      <div className="glass-motion__masked">
        <div className="glass-edge-system">
          {opticalLayers.map(({ name, plane, trackClassName }) => (
            <div className={`glass-edge-layer glass-edge-layer--${name}`} key={name}>
              {['a', 'b'].map((track) => (
                <span
                  className={`glass-track ${trackClassName} glass-track--${track}`}
                  key={`${name}-${track}`}
                >
                  <span className={`glass-light-plane glass-light-plane--${plane}`} />
                </span>
              ))}
            </div>
          ))}

          <div className="glass-light-plane-debug" aria-hidden="true">
            {['a', 'b'].map((track) => (
              <span className={`glass-track glass-light-plane-debug__track glass-track--${track}`} key={track}>
                <span className="glass-light-plane-debug__boundary" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {maskDebug ? (
        <picture className="glass-motion__mask-debug">
          <source media="(max-width: 1024px)" srcSet={mobileMask} />
          <img src={desktopMask} alt="" draggable="false" />
        </picture>
      ) : null}
    </div>
  )
}

export default memo(GlassBackgroundMotion)
