/**
 * LayeredSidebar Types
 * Type definitions for the sidebar navigation component
 */

// Single navigation item (leaf node)
export interface NavItem {
  id: string
  label: string
  labelEn?: string
  icon?: string
  route?: string
}

// Sub-module with optional children
export interface SubModule {
  id: string
  label: string
  labelEn?: string
  icon?: string
  route?: string
  items?: NavItem[]
}

// Top-level module
export interface ModuleConfig {
  id: string
  label: string
  labelEn?: string
  subtitle?: string      // English subtitle for display
  subtitleEn?: string
  icon: string
  route?: string
  subModules?: SubModule[]
}

// Sidebar props
export interface LayeredSidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeModule?: string
  onModuleSelect?: (moduleId: string) => void
  onNavigate?: (route: string) => void
}

// Sidebar state
export interface SidebarState {
  expandedModules: Set<string>
  expandedSubModules: Set<string>
}
