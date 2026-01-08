/**
 * Resources Page - 资源整合主页
 * 展示材质库和项目库的入口、统计概览、最近更新
 */

import { Link } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import { materialCategories, getTotalMaterialsCount, materialsData } from '../data/materialsData'
import { projectsData, getProjectStats, recentUpdates } from '../data/projectsData'

export default function Resources() {
  const projectStats = getProjectStats()
  const totalMaterials = getTotalMaterialsCount()
  
  // 热门材质（按下载量排序取前4）
  const hotMaterials = [...materialsData]
    .sort((a, b) => b.stats.downloads - a.stats.downloads)
    .slice(0, 4)
  
  // 进行中的项目
  const inProgressProjects = projectsData
    .filter(p => p.status === 'in_progress')
    .slice(0, 3)

  return (
    <MainLayout>
      {/* 页面标题 */}
      <header className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">资源整合</h1>
            <p className="text-sm text-gray-400">Resource Hub - 材质库与项目库管理中心</p>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* 搜索栏 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="搜索材质、项目、标签..."
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg border border-gray-600/50 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              筛选
            </button>
            <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg border border-gray-600/50 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              排序
            </button>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl p-4 border border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalMaterials}</div>
                <div className="text-sm text-amber-400">材质总数</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📁</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{projectStats.total}</div>
                <div className="text-sm text-emerald-400">项目总数</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{projectStats.inProgress}</div>
                <div className="text-sm text-blue-400">进行中</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">⬇️</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1.2k</div>
                <div className="text-sm text-purple-400">本月下载</div>
              </div>
            </div>
          </div>
        </div>

        {/* 热门材质 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">🔥</span>
              热门材质
            </h2>
            <Link 
              to="/resources/materials"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotMaterials.map(material => (
              <div 
                key={material.id}
                className="group bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700/30 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={material.thumbnailUrl} 
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white truncate">{material.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{material.resolution} {material.type}</span>
                    <span className="text-xs text-gray-400">⬇️ {material.stats.downloads}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 材质库快速入口 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">🎨</span>
              材质库分类
            </h2>
            <Link 
              to="/resources/materials"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              进入材质库
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {materialCategories.map(category => (
              <Link
                key={category.id}
                to={`/resources/materials?category=${category.id}`}
                className="group bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 hover:border-amber-500/50 hover:bg-gray-800/50 transition-all text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-white">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count}个</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 项目库快速入口 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">📁</span>
              进行中的项目
            </h2>
            <Link 
              to="/resources/projects"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              查看全部项目
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inProgressProjects.map(project => (
              <Link
                key={project.id}
                to={`/resources/projects?id=${project.id}`}
                className="group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/30 hover:border-emerald-500/50 transition-all"
              >
                <div className="aspect-[2/1] overflow-hidden relative">
                  <img 
                    src={project.coverImage} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold">{project.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">进度</span>
                      <span className="text-emerald-400 font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">👥</span>
                      <span className="text-xs text-gray-400">{project.team.length}人</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 最近更新 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <span className="text-xl">📋</span>
            最近更新
          </h2>
          
          <div className="space-y-2">
            {recentUpdates.map(update => (
              <div 
                key={update.id}
                className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{update.icon}</span>
                  <span className="text-gray-300">{update.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">{update.author}</span>
                  <span className="text-gray-600">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
