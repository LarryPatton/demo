import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './hooks/useI18n'
import ArtBible from './pages/ArtBible'
import ArtSpec from './pages/ArtSpec'
import Incubation from './pages/Incubation'

/**
 * Main Application Component
 * Configures routing for three main pages with i18n support
 */
function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArtBible />} />
          <Route path="/spec" element={<ArtSpec />} />
          <Route path="/incubation" element={<Incubation />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App