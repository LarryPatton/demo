/**
 * MainLayout Component
 * Unified layout wrapper with Header + Sidebar + Content + Footer
 * Matches Version5 design structure
 */

import { useState, ReactNode } from 'react'
import Navigation from './Navigation'
import PageBackground from './PageBackground'
import LayeredSidebar from './LayeredSidebar'
import ProfessionalFooter from './ProfessionalFooter'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Background */}
      <PageBackground />

      {/* Top Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="pt-16 flex relative z-10">
        {/* Left Sidebar */}
        <LayeredSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div 
          className={`
            flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]
            ${sidebarCollapsed ? 'ml-20' : 'ml-80'}
          `}
        >
          {/* Content Container */}
          <main className="px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="relative z-10 mt-20">
            <ProfessionalFooter />
          </footer>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
