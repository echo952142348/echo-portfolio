export default function ProjectVisual({ type, label, variant = 'card' }) {
  return (
    <div className={`project-image project-image-${type} project-visual-${variant}`}>
      <span>{label}</span>
      {type === 'mockup' && (
        <div className="visual-mockup">
          <div className="mockup-browser">
            <i />
            <i />
            <i />
          </div>
          <div className="mockup-hero">
            <b />
            <b />
            <b />
          </div>
          <div className="mockup-grid">
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      {type === 'wall' && (
        <div className="visual-wall">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
      {type === 'chart' && (
        <div className="visual-chart">
          <div className="chart-line" />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
      {type === 'nodes' && (
        <div className="visual-nodes">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
    </div>
  )
}
