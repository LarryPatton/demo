/**
 * PageBackground Component
 * Dynamic grid background with decorative gradient circles
 * Matches Version5 design style
 */

function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Decorative Gradient Circles */}
      {/* Top Right - Large Blue Glow */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        style={{ animation: 'pulse 8s ease-in-out infinite' }}
      />
      
      {/* Bottom Left - Medium Blue Glow */}
      <div 
        className="absolute bottom-20 -left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-2xl"
        style={{ animation: 'pulse 10s ease-in-out infinite 2s' }}
      />
      
      {/* Center Right - Small Accent */}
      <div 
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-400/3 rounded-full blur-xl"
        style={{ animation: 'pulse 12s ease-in-out infinite 4s' }}
      />
      
      {/* Top Left - Subtle Glow */}
      <div 
        className="absolute top-40 left-1/3 w-32 h-32 bg-blue-500/4 rounded-full blur-2xl"
        style={{ animation: 'pulse 15s ease-in-out infinite 1s' }}
      />
      
      {/* Vignette Effect - Darker edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  )
}

export default PageBackground
