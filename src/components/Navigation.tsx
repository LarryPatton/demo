import { Link, useLocation } from 'react-router-dom'
import { BookOpen, FileText, Lightbulb, Globe } from 'lucide-react'
import { useI18n, Locale } from '../hooks/useI18n'

/**
 * Navigation Component
 * Shared top navigation bar for all pages with language switcher
 */
function Navigation() {
  const location = useLocation()
  const { locale, setLocale, t, loading } = useI18n()

  // Language options
  const languages: { code: Locale; label: string }[] = [
    { code: 'zh-CN', label: '中文' },
    { code: 'en-US', label: 'English' },
  ]

  // Toggle language
  const toggleLanguage = () => {
    setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN')
  }

  // Navigation items configuration - use i18n data if available
  const navItems = [
    { path: '/', label: t?.nav.artBible || 'Art Bible', icon: BookOpen },
    { path: '/spec', label: t?.nav.artSpec || 'Art Spec', icon: FileText },
    { path: '/incubation', label: t?.nav.incubation || 'Incubation', icon: Lightbulb },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-elevated)] border-b border-[var(--border-default)]">
      <div className="mx-auto px-6" style={{ maxWidth: '2000px' }}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              {t?.nav.brand || 'Game Art Platform'}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded text-sm font-medium
                    transition-colors duration-150
                    ${isActive 
                      ? 'bg-[var(--primary-subtle)] text-[var(--primary-text)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}

            {/* Language Switcher */}
            <div className="ml-4 pl-4 border-l border-[var(--border-default)]">
              <button
                onClick={toggleLanguage}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium
                  text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]
                  transition-colors duration-150 disabled:opacity-50"
                title={t?.common.language || 'Language'}
              >
                <Globe className="w-4 h-4" />
                <span>{languages.find(l => l.code === locale)?.label}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation