import { useState } from 'react'
import Navigation from '../components/Navigation'
import { useI18n } from '../hooks/useI18n'
import { 
  FileText,
  Gamepad2,
  Crosshair,
  Users,
  Puzzle,
  Coffee,
  Monitor,
  Smartphone,
  Gamepad,
  Image,
  Box,
  Film,
  Sparkles,
  Check,
  Loader2
} from 'lucide-react'

/**
 * Art Specification Page
 * Asset production standards by game category and platform
 */

// Icon mapping for filter options
const iconMap: Record<string, React.ElementType> = {
  rpg: Gamepad2,
  fps: Crosshair,
  moba: Users,
  slg: Puzzle,
  casual: Coffee,
  pc: Monitor,
  mobile: Smartphone,
  console: Gamepad,
  texture: Image,
  model: Box,
  animation: Film,
  vfx: Sparkles,
}

// Checkbox component
interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
  iconId: string
}

function Checkbox({ checked, onChange, label, iconId }: CheckboxProps) {
  const Icon = iconMap[iconId] || FileText
  
  return (
    <label className="flex items-center gap-3 py-2 px-3 rounded cursor-pointer hover:bg-[var(--bg-hover)] transition-colors">
      <div 
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
          ${checked 
            ? 'bg-primary border-primary' 
            : 'border-[var(--border-emphasis)] bg-transparent'
          }
        `}
        onClick={onChange}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
      <span className="text-sm text-[var(--text-primary)]">{label}</span>
    </label>
  )
}

// Spec Card component
interface SpecCardProps {
  title: string
  iconId: string
  sections: {
    subtitle: string
    items: { label: string; value: string }[]
  }[]
}

function SpecCard({ title, iconId, sections }: SpecCardProps) {
  const Icon = iconMap[iconId] || FileText
  
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary-subtle)] rounded flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--primary-text)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
      </div>
      
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
              {section.subtitle}
            </h4>
            <div className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="flex items-center justify-between py-2 px-3 bg-[var(--bg-overlay)] rounded"
                >
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArtSpec() {
  const { t, loading } = useI18n()
  
  // Initialize filter state
  const [filters, setFilters] = useState<Record<string, Set<string>>>({
    category: new Set(['rpg']),
    platform: new Set(['pc']),
    asset: new Set(['texture', 'model']),
  })

  // Toggle filter option
  const toggleFilter = (groupId: string, optionId: string) => {
    setFilters(prev => {
      const newSet = new Set(prev[groupId])
      if (newSet.has(optionId)) {
        newSet.delete(optionId)
      } else {
        newSet.add(optionId)
      }
      return { ...prev, [groupId]: newSet }
    })
  }

  // Loading state
  if (loading || !t) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  const { artSpec } = t

  // Filter groups from i18n
  const filterGroups = [
    { id: 'category', ...artSpec.filterGroups.category },
    { id: 'platform', ...artSpec.filterGroups.platform },
    { id: 'asset', ...artSpec.filterGroups.asset },
  ]

  // Specifications from i18n
  const specifications = [
    { id: 'texture', ...artSpec.specs.texture },
    { id: 'model', ...artSpec.specs.model },
    { id: 'animation', ...artSpec.specs.animation },
    { id: 'vfx', ...artSpec.specs.vfx },
  ]

  // Filter specifications based on selected asset types
  const filteredSpecs = specifications.filter(
    spec => filters.asset.has(spec.id)
  )

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navigation />
      
      <main className="pt-16">
        <div className="mx-auto px-6 py-8" style={{ maxWidth: '2000px' }}>
          {/* Page Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  {artSpec.title}
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  {artSpec.subtitle}
                </p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] max-w-3xl">
              {artSpec.description}
            </p>
          </header>

          {/* Main Content: Two Column Layout */}
          <div className="flex gap-6">
            {/* Left Sidebar: Filters */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-4 sticky top-24">
                {filterGroups.map((group) => (
                  <div key={group.id} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2 px-3">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.options.map((option) => (
                        <Checkbox
                          key={option.id}
                          checked={filters[group.id].has(option.id)}
                          onChange={() => toggleFilter(group.id, option.id)}
                          label={option.label}
                          iconId={option.id}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right: Specification Cards */}
            <section className="flex-1">
              {filteredSpecs.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredSpecs.map((spec) => (
                    <SpecCard 
                      key={spec.id} 
                      title={spec.title}
                      iconId={spec.id}
                      sections={spec.sections}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-12 text-center">
                  <FileText className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-secondary)]">
                    {artSpec.emptyState}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ArtSpec