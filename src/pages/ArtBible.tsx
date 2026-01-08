import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import ImagePreviewModal from '../components/ImagePreviewModal'
import { useI18n } from '../hooks/useI18n'
import { 
  BookOpen, 
  Palette, 
  Droplet, 
  User, 
  Mountain, 
  Layout,
  Loader2,
  Sparkles,
  Crosshair,
  Grid3X3,
  Heart,
  Tag,
  Eye,
  Link,
  Users,
  Image
} from 'lucide-react'

/**
 * Art Bible Page
 * Universal art style template system with multiple style options
 */

// Tab icons mapping
const tabIcons = {
  overview: Palette,
  color: Droplet,
  character: User,
  scene: Mountain,
  ui: Layout,
}

// Style icons mapping  
const styleIcons = {
  stylizedFantasy: Sparkles,
  realistic: Crosshair,
  pixelArt: Grid3X3,
  anime: Heart,
}

// Style keys
type StyleKey = 'stylizedFantasy' | 'realistic' | 'pixelArt' | 'anime'
type TabKey = 'overview' | 'color' | 'character' | 'scene' | 'ui'

// Generate placeholder image URLs
function generateImageUrls(styleKey: StyleKey, tabKey: TabKey): string[] {
  const styleSeeds = { stylizedFantasy: 100, realistic: 200, pixelArt: 300, anime: 400 }
  const tabSeeds = { overview: 0, color: 20, character: 40, scene: 60, ui: 80 }
  const baseSeed = styleSeeds[styleKey] + tabSeeds[tabKey]
  return Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${baseSeed + i}/400/300`)
}

// Map sidebar submodule IDs to style keys
const sidebarToStyleMap: Record<string, StyleKey> = {
  'style-overview': 'stylizedFantasy',
  'style-fantasy': 'stylizedFantasy',
  'style-realistic': 'realistic',
  'style-pixel': 'pixelArt',
  'style-anime': 'anime',
}

function ArtBible() {
  const [searchParams] = useSearchParams()
  const [activeStyle, setActiveStyle] = useState<StyleKey>('stylizedFantasy')
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const { t, loading } = useI18n()

  // Sync style from URL parameter (set by sidebar)
  useEffect(() => {
    const styleParam = searchParams.get('style')
    if (styleParam && sidebarToStyleMap[styleParam]) {
      setActiveStyle(sidebarToStyleMap[styleParam])
    }
  }, [searchParams])

  const imageUrls = useMemo(() => generateImageUrls(activeStyle, activeTab), [activeStyle, activeTab])

  if (loading || !t) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  const { artBible } = t
  const styles = artBible.styles as Record<StyleKey, any>
  const currentStyle = styles[activeStyle]
  const currentContent = currentStyle.content[activeTab]
  const tabs: { id: TabKey; label: string }[] = [
    { id: 'overview', label: currentStyle.tabs.overview },
    { id: 'color', label: currentStyle.tabs.color },
    { id: 'character', label: currentStyle.tabs.character },
    { id: 'scene', label: currentStyle.tabs.scene },
    { id: 'ui', label: currentStyle.tabs.ui },
  ]

  const openPreview = (index: number) => setPreviewIndex(index)
  const closePreview = () => setPreviewIndex(null)
  const prevImage = () => { if (previewIndex !== null && previewIndex > 0) setPreviewIndex(previewIndex - 1) }
  const nextImage = () => { if (previewIndex !== null && previewIndex < imageUrls.length - 1) setPreviewIndex(previewIndex + 1) }

  return (
    <MainLayout>
      {/* Page Header with Current Style Info */}
      <header className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {artBible.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {artBible.description}
            </p>
          </div>
        </div>
        {/* Current Style Badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-[var(--text-muted)]">当前风格:</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
            {currentStyle.name}
          </span>
          <span className="text-sm text-[var(--text-muted)]">—</span>
          <span className="text-sm text-[var(--text-secondary)]">{currentStyle.project}</span>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-[var(--border-default)]">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.id]
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium
                  border-b-2 transition-colors duration-150
                  ${isActive 
                    ? 'border-primary text-[var(--primary-text)]' 
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-muted)]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area - Optimized Layout */}
      <div className="space-y-6">
        {/* Info Bar - Horizontal compact display */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-[var(--primary-text)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {currentContent.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Keywords */}
            <div className="flex items-start gap-2">
              <Tag className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{artBible.labels.keywords}</div>
                <div className="text-sm text-[var(--text-primary)]">{currentContent.keywords}</div>
              </div>
            </div>
            {/* Tone */}
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{artBible.labels.tone}</div>
                <div className="text-sm text-[var(--text-primary)]">{currentContent.tone}</div>
              </div>
            </div>
            {/* Reference */}
            <div className="flex items-start gap-2">
              <Link className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{artBible.labels.reference}</div>
                <div className="text-sm text-[var(--text-primary)]">{currentContent.reference}</div>
              </div>
            </div>
            {/* Audience */}
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{artBible.labels.audience}</div>
                <div className="text-sm text-[var(--text-primary)]">{currentContent.audience}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Images - Full Width Grid */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
              <Image className="w-4 h-4" />
              {artBible.labels.referenceImages}
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              {artBible.labels.clickToView}
            </span>
          </div>
          
          {/* Image Grid - 6 columns on xl screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {imageUrls.map((url, index) => (
              <div 
                key={index}
                onClick={() => openPreview(index)}
                className="aspect-[4/3] bg-[var(--bg-overlay)] border border-gray-700/50 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500/50 hover:scale-[1.02] transition-all group relative"
              >
                <img src={url} alt={`${artBible.labels.reference} ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">{artBible.labels.clickToView}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={previewIndex !== null}
        imageUrl={previewIndex !== null ? imageUrls[previewIndex] : ''}
        imageAlt={previewIndex !== null ? `${artBible.labels.reference} ${previewIndex + 1}` : ''}
        onClose={closePreview}
        onPrev={prevImage}
        onNext={nextImage}
        hasPrev={previewIndex !== null && previewIndex > 0}
        hasNext={previewIndex !== null && previewIndex < imageUrls.length - 1}
      />
    </MainLayout>
  )
}

export default ArtBible