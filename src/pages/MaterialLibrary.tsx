/**
 * MaterialLibrary Page - 材质库页面
 * 展示材质分类、网格浏览、搜索筛选、详情弹窗
 */

import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import { 
  materialsData, 
  materialCategories, 
  Material, 
  getTotalMaterialsCount,
  popularTags 
} from '../data/materialsData'

// 材质详情弹窗组件
function MaterialModal({ 
  material, 
  onClose 
}: { 
  material: Material | null
  onClose: () => void 
}) {
  if (!material) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        {/* 头部关闭按钮 */}
        <div className="flex justify-end p-4 border-b border-gray-800">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* 预览图 */}
          <div className="aspect-video bg-gray-800 relative">
            <img 
              src={material.thumbnailUrl} 
              alt={material.name}
              className="w-full h-full object-cover"
            />
            {/* 贴图类型切换（模拟） */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {['Albedo', 'Normal', 'Roughness', 'AO'].map((type, i) => (
                <button 
                  key={type}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    i === 0 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* 详情内容 */}
          <div className="p-6 space-y-6">
            {/* 标题 */}
            <div>
              <h2 className="text-2xl font-bold text-white">{material.name}</h2>
              <p className="text-gray-500">{material.nameEn}</p>
            </div>
            
            {/* 材质信息 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">分辨率</div>
                <div className="text-white font-medium">{material.resolution}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">格式</div>
                <div className="text-white font-medium">{material.format}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">类型</div>
                <div className="text-white font-medium">{material.type}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">大小</div>
                <div className="text-white font-medium">{material.fileSize}</div>
              </div>
            </div>
            
            {/* 标签 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">标签</div>
              <div className="flex flex-wrap gap-2">
                {material.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 描述 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">描述</div>
              <p className="text-gray-300 leading-relaxed">{material.description}</p>
            </div>
            
            {/* 统计 */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-400">
                ⬇️ 下载 <span className="text-white font-medium">{material.stats.downloads}</span> 次
              </span>
              <span className="text-gray-400">
                ⭐ 收藏 <span className="text-white font-medium">{material.stats.favorites}</span> 次
              </span>
              <span className="text-gray-400">
                评分 <span className="text-yellow-400 font-medium">⭐ {material.stats.rating}</span>
              </span>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex gap-4 pt-4 border-t border-gray-800">
              <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>⬇️</span>
                下载材质
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2">
                <span>⭐</span>
                收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MaterialLibrary() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['stone']))
  
  // 筛选材质
  const filteredMaterials = useMemo(() => {
    let result = materialsData
    
    // 分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(m => m.category === selectedCategory)
    }
    
    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.nameEn.toLowerCase().includes(query) ||
        m.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return result
  }, [selectedCategory, searchQuery])
  
  // 切换分类展开
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }
  
  // 选择分类
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSearchParams(categoryId === 'all' ? {} : { category: categoryId })
  }

  return (
    <MainLayout>
      {/* 页面标题 */}
      <header className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">材质库</h1>
            <p className="text-sm text-gray-400">Material Library - 共 {getTotalMaterialsCount()} 个材质</p>
          </div>
        </div>
      </header>

      <div className="flex gap-6">
        {/* 左侧分类面板 */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sticky top-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">📂 材质分类</h3>
            
            {/* 全部 */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              全部材质 ({getTotalMaterialsCount()})
            </button>
            
            {/* 分类列表 */}
            <div className="space-y-1">
              {materialCategories.map(category => (
                <div key={category.id}>
                  <button
                    onClick={() => {
                      toggleCategory(category.id)
                      handleCategorySelect(category.id)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                    <span className="text-sm opacity-70">({category.count})</span>
                  </button>
                  
                  {/* 子分类 */}
                  {expandedCategories.has(category.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {category.subcategories.map(sub => (
                        <button
                          key={sub}
                          className="w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* 热门标签 */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <h3 className="text-sm font-medium text-gray-400 mb-3">🏷️ 热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white text-xs rounded transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1">
          {/* 工具栏 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 mb-4">
            <div className="flex items-center gap-4">
              {/* 搜索 */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索材质..."
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* 视图切换 */}
              <div className="flex bg-gray-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ⊞ 网格
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ≡ 列表
                </button>
              </div>
              
              {/* 排序 */}
              <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none">
                <option>最新上传</option>
                <option>下载最多</option>
                <option>评分最高</option>
                <option>名称排序</option>
              </select>
            </div>
            
            {/* 结果统计 */}
            <div className="mt-3 text-sm text-gray-500">
              共找到 <span className="text-white font-medium">{filteredMaterials.length}</span> 个材质
            </div>
          </div>

          {/* 材质网格 */}
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredMaterials.map(material => (
              <div
                key={material.id}
                onClick={() => setSelectedMaterial(material)}
                className={`group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* 缩略图 */}
                <div className={`overflow-hidden ${viewMode === 'list' ? 'w-32 h-24' : 'aspect-[4/3]'}`}>
                  <img 
                    src={material.thumbnailUrl} 
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* 信息 */}
                <div className={`p-3 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                  <div>
                    <h3 className="text-sm font-medium text-white truncate">{material.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{material.resolution}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{material.type}</span>
                    </div>
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>⬇️ {material.stats.downloads}</span>
                      <span>⭐ {material.stats.rating}</span>
                    </div>
                  )}
                  
                  {viewMode === 'grid' && (
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                      <span>⬇️ {material.stats.downloads}</span>
                      <span>⭐ {material.stats.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* 空状态 */}
          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400">未找到匹配的材质</p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-4 text-blue-400 hover:text-blue-300"
              >
                清除筛选条件
              </button>
            </div>
          )}
          
          {/* 分页（示意） */}
          {filteredMaterials.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button className="px-3 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:bg-gray-700/50 transition-colors">
                ← 上一页
              </button>
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    page === 1 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-600">...</span>
              <button className="px-3 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:bg-gray-700/50 transition-colors">
                下一页 →
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* 材质详情弹窗 */}
      <MaterialModal 
        material={selectedMaterial} 
        onClose={() => setSelectedMaterial(null)} 
      />
    </MainLayout>
  )
}
