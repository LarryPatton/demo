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
  Loader2,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Copy,
  CheckCircle2,
  XCircle,
  CircleDot,
  Layers,
  Paintbrush,
  Layout,
  ClipboardList,
  FolderTree,
  BookOpen
} from 'lucide-react'

/**
 * Art Specification Page
 * Asset production standards, project structure, naming conventions, and delivery checklist
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
  material: Paintbrush,
  ui: Layout,
}

// Top-level tab type
type TopTab = 'asset' | 'project' | 'checklist'

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

// Tree Node interface for directory structure
interface TreeNode {
  name: string
  type: 'folder' | 'file'
  desc?: string
  children?: TreeNode[]
}

// Directory Tree Item component
function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0
  
  return (
    <div>
      <div 
        className={`
          flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer
          hover:bg-[var(--bg-hover)] transition-colors
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}
        
        {node.type === 'folder' ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          )
        ) : (
          <FileText className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
        )}
        
        <span className="text-sm font-mono text-[var(--text-primary)]">
          {node.name}
        </span>
        
        {node.desc && (
          <span className="text-xs text-[var(--text-muted)] ml-2">
            {node.desc}
          </span>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child, idx) => (
            <TreeItem key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// Copy Button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-[var(--bg-hover)] transition-colors"
      title="Copy"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-[var(--text-muted)]" />
      )}
    </button>
  )
}

// Checklist Item component
function ChecklistItem({ item, required }: { item: string; required: boolean }) {
  const [checked, setChecked] = useState(false)
  
  return (
    <label className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
      <div 
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0
          ${checked 
            ? 'bg-green-500 border-green-500' 
            : 'border-[var(--border-emphasis)] bg-transparent'
          }
        `}
        onClick={() => setChecked(!checked)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-sm ${checked ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
        {item}
      </span>
      {required ? (
        <span className="ml-auto text-xs px-2 py-0.5 bg-red-500/10 text-red-500 rounded">
          Required
        </span>
      ) : (
        <span className="ml-auto text-xs px-2 py-0.5 bg-[var(--bg-overlay)] text-[var(--text-muted)] rounded">
          Optional
        </span>
      )}
    </label>
  )
}

function ArtSpec() {
  const { t, loading } = useI18n()
  
  // Top-level tab state
  const [activeTab, setActiveTab] = useState<TopTab>('asset')
  
  // Engine selector for project structure
  const [selectedEngine, setSelectedEngine] = useState<'unity' | 'unreal'>('unity')
  
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

  // All specifications from i18n (including new ones)
  const allSpecs: Record<string, { title: string; sections: { subtitle: string; items: { label: string; value: string }[] }[] }> = artSpec.specs

  // Filter specifications based on selected asset types
  const filteredSpecs = Object.entries(allSpecs)
    .filter(([id]) => filters.asset.has(id))
    .map(([id, spec]) => ({ id, ...spec }))

  // Tab configuration
  const tabs = [
    { id: 'asset' as TopTab, label: artSpec.tabs?.asset || 'Asset Specs', icon: Layers },
    { id: 'project' as TopTab, label: artSpec.tabs?.project || 'Project Structure', icon: FolderTree },
    { id: 'checklist' as TopTab, label: artSpec.tabs?.checklist || 'Delivery Checklist', icon: ClipboardList },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navigation />
      
      <main className="pt-16">
        <div className="mx-auto px-6 py-8" style={{ maxWidth: '2000px' }}>
          {/* Page Header */}
          <header className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
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

          {/* Top-Level Tabs */}
          <div className="flex gap-2 mb-6 border-b border-[var(--border-default)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                  border-b-2 -mb-px
                  ${activeTab === tab.id 
                    ? 'text-primary border-primary' 
                    : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'asset' && (
            /* Asset Specifications Tab */
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
          )}

          {activeTab === 'project' && artSpec.projectStructure && (
            /* Project Structure Tab */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Directory Structure */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {artSpec.projectStructure.title}
                  </h3>
                  {/* Engine Selector */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedEngine('unity')}
                      className={`
                        px-3 py-1.5 text-sm rounded transition-colors
                        ${selectedEngine === 'unity' 
                          ? 'bg-primary text-white' 
                          : 'bg-[var(--bg-overlay)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                        }
                      `}
                    >
                      Unity
                    </button>
                    <button
                      onClick={() => setSelectedEngine('unreal')}
                      className={`
                        px-3 py-1.5 text-sm rounded transition-colors
                        ${selectedEngine === 'unreal' 
                          ? 'bg-primary text-white' 
                          : 'bg-[var(--bg-overlay)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                        }
                      `}
                    >
                      Unreal
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {artSpec.projectStructure.description}
                </p>
                
                {/* Directory Tree */}
                <div className="bg-[var(--bg-overlay)] rounded p-4 max-h-[500px] overflow-y-auto">
                  {artSpec.projectStructure.engines[selectedEngine]?.tree.map((node: TreeNode, idx: number) => (
                    <TreeItem key={idx} node={node} />
                  ))}
                </div>
              </div>

              {/* Naming Convention */}
              {artSpec.naming && (
                <div className="space-y-6">
                  {/* Naming Format */}
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {artSpec.naming.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                      {artSpec.naming.description}
                    </p>
                    
                    {/* Format Pattern */}
                    <div className="bg-[var(--bg-overlay)] rounded p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {artSpec.naming.format.title}
                        </span>
                        <CopyButton text={artSpec.naming.format.pattern} />
                      </div>
                      <code className="text-sm text-primary font-mono">
                        {artSpec.naming.format.pattern}
                      </code>
                      <div className="mt-2 text-xs text-[var(--text-muted)]">
                        Example: <code className="text-[var(--text-secondary)]">{artSpec.naming.format.example}</code>
                      </div>
                    </div>

                    {/* Prefix Table */}
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      {artSpec.naming.prefixes.title}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border-default)]">
                            <th className="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Prefix</th>
                            <th className="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Type</th>
                            <th className="text-left py-2 px-3 text-[var(--text-secondary)] font-medium">Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          {artSpec.naming.prefixes.items.map((item: { prefix: string; type: string; desc: string; example: string }, idx: number) => (
                            <tr key={idx} className="border-b border-[var(--border-default)] last:border-0">
                              <td className="py-2 px-3">
                                <code className="text-primary font-mono">{item.prefix}</code>
                              </td>
                              <td className="py-2 px-3 text-[var(--text-secondary)]">{item.desc}</td>
                              <td className="py-2 px-3">
                                <code className="text-xs text-[var(--text-muted)] font-mono">{item.example}</code>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Texture Suffixes */}
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      {artSpec.naming.textureSuffixes.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {artSpec.naming.textureSuffixes.items.map((item: { suffix: string; type: string; desc: string }, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-3 bg-[var(--bg-overlay)] rounded">
                          <code className="text-sm text-primary font-mono">{item.suffix}</code>
                          <span className="text-xs text-[var(--text-muted)]">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      {artSpec.naming.examples.title}
                    </h4>
                    
                    {/* Correct Examples */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-green-500 mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">✓ Correct</span>
                      </div>
                      <div className="space-y-1">
                        {artSpec.naming.examples.correct.map((example: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 py-1.5 px-3 bg-green-500/5 rounded text-sm">
                            <code className="text-[var(--text-primary)] font-mono">{example.split(' — ')[0]}</code>
                            {example.includes(' — ') && (
                              <span className="text-[var(--text-muted)] text-xs">— {example.split(' — ')[1]}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Incorrect Examples */}
                    <div>
                      <div className="flex items-center gap-2 text-red-500 mb-2">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">✗ Incorrect</span>
                      </div>
                      <div className="space-y-1">
                        {artSpec.naming.examples.incorrect.map((example: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 py-1.5 px-3 bg-red-500/5 rounded text-sm">
                            <code className="text-[var(--text-primary)] font-mono line-through opacity-70">{example.split(' — ')[0]}</code>
                            {example.includes(' — ') && (
                              <span className="text-red-400 text-xs">— {example.split(' — ')[1]}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'checklist' && artSpec.checklist && (
            /* Delivery Checklist Tab */
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {artSpec.checklist.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {artSpec.checklist.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(artSpec.checklist.categories).map(([key, category]: [string, { title: string; items: { item: string; required: boolean }[] }]) => (
                  <div key={key} className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[var(--primary-subtle)] rounded flex items-center justify-center">
                        {key === 'model' && <Box className="w-5 h-5 text-[var(--primary-text)]" />}
                        {key === 'texture' && <Image className="w-5 h-5 text-[var(--primary-text)]" />}
                        {key === 'animation' && <Film className="w-5 h-5 text-[var(--primary-text)]" />}
                        {key === 'vfx' && <Sparkles className="w-5 h-5 text-[var(--primary-text)]" />}
                        {key === 'general' && <CircleDot className="w-5 h-5 text-[var(--primary-text)]" />}
                      </div>
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">
                        {category.title}
                      </h4>
                    </div>
                    
                    <div className="space-y-1">
                      {category.items.map((item: { item: string; required: boolean }, idx: number) => (
                        <ChecklistItem 
                          key={idx} 
                          item={item.item} 
                          required={item.required} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ArtSpec