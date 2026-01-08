/**
 * LayeredSidebar Component
 * Multi-level collapsible sidebar navigation
 * Matches Version5 design style
 */

import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LayeredSidebarProps, ModuleConfig } from './types'
import { moduleConfigs, getTotalItemsCount, getModulesCount } from './config'
import { useI18n } from '../../hooks/useI18n'

// Collapsed view - only show icons
function CollapsedView({ 
  modules, 
  onModuleClick,
  activeModuleId 
}: { 
  modules: ModuleConfig[]
  onModuleClick: (module: ModuleConfig) => void
  activeModuleId?: string
}) {
  return (
    <div className="py-4 space-y-2">
      {modules.map(module => (
        <button
          key={module.id}
          onClick={() => onModuleClick(module)}
          className={`
            w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200
            ${activeModuleId === module.id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }
          `}
          title={module.label}
        >
          <span className="text-xl">{module.icon}</span>
        </button>
      ))}
    </div>
  )
}

// Expanded module list - Version5 style
function ModuleList({
  modules,
  expandedModules,
  activeModuleId,
  activeStyleId,
  onModuleToggle,
  onNavigate,
  locale
}: {
  modules: ModuleConfig[]
  expandedModules: Set<string>
  activeModuleId?: string
  activeStyleId?: string
  onModuleToggle: (moduleId: string) => void
  onNavigate: (route: string) => void
  locale: string
}) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)

  const getLabel = (item: { label: string; labelEn?: string }) => {
    return locale === 'en-US' && item.labelEn ? item.labelEn : item.label
  }

  // Get submodule count for a module
  const getSubModuleCount = (module: ModuleConfig) => {
    return module.subModules?.length || 0
  }

  return (
    <div className="space-y-2">
      {modules.map(module => {
        const isExpanded = expandedModules.has(module.id)
        const isActive = activeModuleId === module.id
        const isHovered = hoveredModule === module.id
        
        return (
          <div key={module.id} className="group">
            {/* 一级模块 - Version5 风格 */}
            <div 
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                isActive || isExpanded
                  ? 'bg-blue-600 shadow-lg'
                  : 'bg-gray-800/60 border border-gray-700/50'
              }`}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              {/* 背景装饰 */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                isHovered || isActive ? 'opacity-100' : ''
              }`}>
                <div className="absolute inset-0 bg-blue-600/20"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              </div>

              <div className="relative z-10 flex items-center p-4">
                {/* A区域 - 展开/折叠按钮 */}
                {module.subModules && module.subModules.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onModuleToggle(module.id)
                    }}
                    className={`mr-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                      isExpanded
                        ? 'bg-blue-400/25 border border-blue-400/80'
                        : 'bg-gray-700/50 border border-gray-600/30 hover:bg-gray-600/80 hover:border-orange-500/60'
                    }`}
                  >
                    <svg 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isExpanded ? 'rotate-90 text-orange-400' : 'text-gray-400 hover:text-white'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
                
                {/* B区域 - 内容主体区 */}
                <button
                  onClick={() => {
                    onModuleToggle(module.id)
                    if (module.route) {
                      onNavigate(module.route)
                    }
                  }}
                  className="flex items-center flex-1 space-x-4 text-left cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-gray-700/50'
                  }`}>
                    {module.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-200'
                    }`}>
                      {getLabel(module)}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isActive ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {module.subtitle}
                    </p>
                  </div>
                </button>
                
                {/* C区域 - 数量徽章 */}
                <span className={`text-sm px-2.5 py-1 rounded-full transition-colors duration-300 ${
                  isActive 
                    ? 'bg-white/20 text-white font-bold' 
                    : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {getSubModuleCount(module)}
                </span>
              </div>
            </div>

            {/* 二级子模块展开区域 */}
            {module.subModules && isExpanded && (
              <div className="mt-2 ml-3 space-y-1.5 animate-fadeIn">
                {module.subModules.map((subModule, index) => {
                  // Check if this submodule is active
                  const isSubActive = activeStyleId === subModule.id
                  
                  return (
                    <div
                      key={subModule.id}
                      className={`flex items-center rounded-xl transition-all duration-300 ${
                        isSubActive 
                          ? 'bg-blue-600 shadow-lg' 
                          : 'bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 hover:border-gray-600/50'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* 内容区 */}
                      <button
                        onClick={() => {
                          if (subModule.route) {
                            onNavigate(subModule.route)
                          }
                        }}
                        className="flex-1 flex items-center space-x-2.5 p-2.5 group/sub"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-transform duration-200 ${
                          isSubActive 
                            ? 'bg-white/20 text-white scale-110' 
                            : 'bg-blue-500/20 text-blue-400 group-hover/sub:scale-110'
                        }`}>
                          {subModule.icon}
                        </div>
                        
                        <div className="flex-1 text-left">
                          <span className={`text-sm font-medium transition-colors duration-200 ${
                            isSubActive 
                              ? 'text-white' 
                              : 'text-gray-200 group-hover/sub:text-white'
                          }`}>
                            {getLabel(subModule)}
                          </span>
                        </div>
                        
                        {/* 右箭头 */}
                        <svg 
                          className={`w-4 h-4 transition-all duration-200 ${
                            isSubActive
                              ? 'text-white translate-x-1'
                              : 'text-gray-500 group-hover/sub:text-gray-300 group-hover/sub:translate-x-1'
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Sidebar Footer with stats - Version5 style
function SidebarFooter({ moduleCount, itemCount }: { moduleCount: number; itemCount: number }) {
  return (
    <div className="mt-4 p-3 border-t border-gray-700/50 bg-gray-900/50 rounded-xl mx-3 mb-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">总计</span>
        <span className="text-white font-semibold">{itemCount} 项资源</span>
      </div>
    </div>
  )
}

// Sidebar Header - Version5 style
function SidebarHeader({ collapsed, onNavigate }: { collapsed: boolean; onNavigate: (route: string) => void }) {
  return (
    <button
      onClick={() => onNavigate('/hub')}
      className={`w-full flex items-center py-3 border-b border-gray-700/30 mb-3 transition-all duration-200 hover:bg-gray-700/30 ${
        collapsed ? 'justify-center px-2' : 'justify-center px-4'
      }`}
    >
      {collapsed ? (
        <div className="text-white font-bold text-lg hover:text-blue-400 transition-colors">G</div>
      ) : (
        <div className="text-center">
          <h3 className="text-white font-bold text-lg hover:text-blue-400 transition-colors">Game Art Hub</h3>
          <p className="text-blue-400 text-xs">美术资源中心</p>
        </div>
      )}
    </button>
  )
}

// 根据路径获取对应的模块ID
function getModuleIdFromPath(path: string): string {
  if (path === '/' || path === '/art-bible' || path.startsWith('/art-bible/')) {
    return 'art-bible'
  }
  if (path === '/art-spec' || path === '/spec' || path.startsWith('/spec/')) {
    return 'art-spec'
  }
  if (path === '/incubation-intro' || path === '/incubation' || path.startsWith('/incubation/')) {
    return 'incubation'
  }
  if (path === '/resources-intro' || path.startsWith('/resources')) {
    return 'resources'
  }
  return ''
}

// Main LayeredSidebar component
export function LayeredSidebar({
  collapsed,
  onToggle,
  activeModule,
  onNavigate
}: LayeredSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { locale } = useI18n()
  
  // 根据当前路径计算初始模块ID
  const initialModuleId = getModuleIdFromPath(location.pathname)
  
  // Expanded states - 根据当前路径初始化
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    initialModuleId ? new Set([initialModuleId]) : new Set()
  )
  
  // Determine active module based on route
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId)
  
  // Get active style from URL params
  const activeStyleId = searchParams.get('style') || undefined
  
  useEffect(() => {
    const moduleId = getModuleIdFromPath(location.pathname)
    setActiveModuleId(moduleId)
    setExpandedModules(moduleId ? new Set([moduleId]) : new Set())
  }, [location.pathname])
  
  // Toggle module expansion - 手风琴效果：只展开一个模块
  const handleModuleToggle = (moduleId: string) => {
    setExpandedModules(prev => {
      // 如果当前模块已展开，则收起
      if (prev.has(moduleId)) {
        return new Set()
      }
      // 否则只展开当前模块（收起其他所有）
      return new Set([moduleId])
    })
  }
  
  // Navigate to route
  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route)
    } else {
      navigate(route)
    }
  }
  
  // Handle module click in collapsed mode
  const handleCollapsedModuleClick = (module: ModuleConfig) => {
    if (module.route) {
      handleNavigate(module.route)
    }
    // Expand sidebar when clicking module
    if (collapsed) {
      onToggle()
    }
  }

  return (
    <div
      className={`
        fixed left-0 top-14 bottom-0 bg-gray-900 transition-all duration-300 
        ${collapsed ? 'w-20' : 'w-80'}
        shadow-2xl border-r border-gray-700/50 z-40 flex flex-col
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-4 top-6 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 z-50"
      >
        <svg
          className={`w-4 h-4 text-white transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header */}
      <SidebarHeader collapsed={collapsed} onNavigate={handleNavigate} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-20 custom-scrollbar">
        {collapsed ? (
          <CollapsedView 
            modules={moduleConfigs}
            onModuleClick={handleCollapsedModuleClick}
            activeModuleId={activeModuleId}
          />
        ) : (
          <ModuleList
            modules={moduleConfigs}
            expandedModules={expandedModules}
            activeModuleId={activeModuleId}
            activeStyleId={activeStyleId}
            onModuleToggle={handleModuleToggle}
            onNavigate={handleNavigate}
            locale={locale}
          />
        )}
      </div>

      {/* Footer Stats */}
      {!collapsed && (
        <SidebarFooter 
          moduleCount={getModulesCount()} 
          itemCount={getTotalItemsCount()} 
        />
      )}
    </div>
  )
}

export default LayeredSidebar

// 自定义滚动条样式 - 蓝色高亮版
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.7) rgba(17, 24, 39, 0.8);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(17, 24, 39, 0.8);
    border-radius: 4px;
    margin: 8px 0;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.7);
    border-radius: 4px;
    border: 2px solid rgba(17, 24, 39, 0.3);
    transition: all 0.3s ease;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.9);
    border-color: rgba(17, 24, 39, 0.5);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(96, 165, 250, 1);
    box-shadow: 0 0 14px rgba(59, 130, 246, 0.7);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`

// 注入样式到页面
if (typeof document !== 'undefined') {
  const styleId = 'layered-sidebar-scrollbar-styles'
  if (!document.getElementById(styleId)) {
    const styleElement = document.createElement('style')
    styleElement.id = styleId
    styleElement.textContent = scrollbarStyles
    document.head.appendChild(styleElement)
  }
}