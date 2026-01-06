import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

/**
 * Supported locale types
 */
export type Locale = 'zh-CN' | 'en-US'

/**
 * Default locale - Chinese
 */
const DEFAULT_LOCALE: Locale = 'zh-CN'

/**
 * Storage key for locale preference
 */
const LOCALE_STORAGE_KEY = 'app-locale'

/**
 * i18n cache to avoid re-fetching
 */
const i18nCache: Map<string, AppI18n> = new Map()

/**
 * App i18n type definition
 */
export interface AppI18n {
  // Navigation
  nav: {
    brand: string
    artBible: string
    artSpec: string
    incubation: string
  }
  // Art Bible page
  artBible: {
    title: string
    subtitle: string
    description: string
    tabs: {
      overview: string
      color: string
      character: string
      scene: string
      ui: string
    }
    content: {
      overview: {
        title: string
        description: string
        items: string[]
      }
      color: {
        title: string
        description: string
        items: string[]
      }
      character: {
        title: string
        description: string
        items: string[]
      }
      scene: {
        title: string
        description: string
        items: string[]
      }
      ui: {
        title: string
        description: string
        items: string[]
      }
    }
    labels: {
      keyGuidelines: string
      referenceImages: string
      notes: string
      notesText: string
      reference: string
    }
  }
  // Art Spec page
  artSpec: {
    title: string
    subtitle: string
    description: string
    filterGroups: {
      category: {
        title: string
        options: { id: string; label: string }[]
      }
      platform: {
        title: string
        options: { id: string; label: string }[]
      }
      asset: {
        title: string
        options: { id: string; label: string }[]
      }
    }
    specs: {
      texture: {
        title: string
        sections: {
          subtitle: string
          items: { label: string; value: string }[]
        }[]
      }
      model: {
        title: string
        sections: {
          subtitle: string
          items: { label: string; value: string }[]
        }[]
      }
      animation: {
        title: string
        sections: {
          subtitle: string
          items: { label: string; value: string }[]
        }[]
      }
      vfx: {
        title: string
        sections: {
          subtitle: string
          items: { label: string; value: string }[]
        }[]
      }
    }
    emptyState: string
  }
  // Incubation page
  incubation: {
    title: string
    subtitle: string
    description: string
    form: {
      title: string
      projectName: string
      projectNamePlaceholder: string
      email: string
      emailPlaceholder: string
      descriptionLabel: string
      descriptionPlaceholder: string
      document: string
      dragDropText: string
      supportedFormats: string
      submitButton: string
    }
    proposals: {
      title: string
      submitted: string
      status: {
        reviewing: string
        approved: string
        rejected: string
      }
    }
    validation: {
      projectNameRequired: string
      emailRequired: string
      descriptionRequired: string
      invalidFileType: string
      submitSuccess: string
    }
    mockData: {
      name1: string
      desc1: string
      name2: string
      desc2: string
      name3: string
      desc3: string
    }
  }
  // Common
  common: {
    language: string
  }
}

/**
 * i18n Context
 */
interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: AppI18n | null
  loading: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

/**
 * i18n Provider Component
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  // Get initial locale from localStorage or use default
  const getInitialLocale = (): Locale => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
      if (stored === 'zh-CN' || stored === 'en-US') {
        return stored
      }
    }
    return DEFAULT_LOCALE
  }

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const [t, setT] = useState<AppI18n | null>(null)
  const [loading, setLoading] = useState(true)

  // Set locale and save to localStorage
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }

  // Load i18n data
  useEffect(() => {
    const loadI18n = async () => {
      const cacheKey = locale

      // Check cache first
      if (i18nCache.has(cacheKey)) {
        setT(i18nCache.get(cacheKey)!)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/i18n/${locale}/app.json`)
        
        if (!response.ok) {
          throw new Error(`Failed to load i18n: ${response.status}`)
        }

        const json: AppI18n = await response.json()
        
        // Cache the result
        i18nCache.set(cacheKey, json)
        setT(json)
      } catch (err) {
        console.error('Failed to load i18n:', err)
        // Try to fall back to cached default locale
        if (i18nCache.has(DEFAULT_LOCALE)) {
          setT(i18nCache.get(DEFAULT_LOCALE)!)
        }
      } finally {
        setLoading(false)
      }
    }

    loadI18n()
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, loading }}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook to use i18n
 */
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
