import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './hooks/useI18n'
import Hub from './pages/Hub'
import ArtBible from './pages/ArtBible'
import ArtSpec from './pages/ArtSpec'
import Incubation from './pages/Incubation'
import Resources from './pages/Resources'
import MaterialLibrary from './pages/MaterialLibrary'
import ProjectLibrary from './pages/ProjectLibrary'
// 分类介绍页
import { 
  ArtBibleIntro, 
  ArtSpecIntro, 
  IncubationIntro, 
  ResourcesIntro 
} from './pages/intro'

/**
 * Main Application Component
 * Configures routing for three main pages with i18n support
 * Uses import.meta.env.BASE_URL for GitHub Pages compatibility
 */
function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* 一级模块介绍页 */}
          <Route path="/art-bible" element={<ArtBibleIntro />} />
          <Route path="/art-spec" element={<ArtSpecIntro />} />
          <Route path="/incubation-intro" element={<IncubationIntro />} />
          <Route path="/resources-intro" element={<ResourcesIntro />} />
          
          {/* 美术圣经子页面 */}
          <Route path="/" element={<ArtBible />} />
          <Route path="/art-bible/:styleId" element={<ArtBible />} />
          
          {/* Hub 总览 */}
          <Route path="/hub" element={<Hub />} />
          
          {/* 美术规范子页面 */}
          <Route path="/spec" element={<ArtSpec />} />
          <Route path="/spec/:specId" element={<ArtSpec />} />
          
          {/* 项目孵化子页面 */}
          <Route path="/incubation" element={<Incubation />} />
          <Route path="/incubation/:section" element={<Incubation />} />
          
          {/* 资源整合子页面 */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/materials" element={<MaterialLibrary />} />
          <Route path="/resources/projects" element={<ProjectLibrary />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
