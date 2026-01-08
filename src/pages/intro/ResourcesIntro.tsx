/**
 * ResourcesIntro - 资源整合介绍页
 * 展示资源整合模块的概览和子模块入口
 */

import MainLayout from '../../components/MainLayout'
import CategoryIntroPage from '../../components/CategoryIntroPage'
import { getTotalMaterialsCount, materialCategories } from '../../data/materialsData'
import { getProjectStats } from '../../data/projectsData'

// 子模块配置
const subModules = [
  {
    id: 'material-library',
    label: '材质库',
    labelEn: 'Material Library',
    icon: '🎨',
    description: '高质量PBR材质资源，涵盖石材、金属、木材、布料等多种类型',
    route: '/resources/materials',
    count: getTotalMaterialsCount()
  },
  {
    id: 'project-library',
    label: '项目库',
    labelEn: 'Project Library',
    icon: '📁',
    description: '项目资产管理，追踪进度，团队协作，里程碑管理',
    route: '/resources/projects',
    count: getProjectStats().total
  }
]

// 统计数据
const projectStats = getProjectStats()
const stats = [
  { label: '材质资源', value: getTotalMaterialsCount(), icon: '🎨' },
  { label: '材质分类', value: materialCategories.length, icon: '📂' },
  { label: '项目总数', value: projectStats.total, icon: '📁' },
  { label: '进行中', value: projectStats.inProgress, icon: '🔄' }
]

export default function ResourcesIntro() {
  return (
    <MainLayout>
      <CategoryIntroPage
        icon="📦"
        title="资源整合"
        titleEn="Resource Hub"
        description="集中管理材质库和项目库，提供统一的资源搜索、下载和协作功能。一站式资源管理，让创作更高效。"
        color="orange"
        subModules={subModules}
        stats={stats}
      >
        {/* 材质分类预览 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🎨</span>
            材质分类
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {materialCategories.map(category => (
              <a
                key={category.id}
                href={`/resources/materials?category=${category.id}`}
                className="group bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 hover:border-amber-500/50 hover:bg-gray-800/50 transition-all text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-white">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count}个</div>
              </a>
            ))}
          </div>
        </div>
        
        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/20">
            <div className="text-2xl mb-3">🔍</div>
            <h4 className="font-semibold text-white mb-2">智能搜索</h4>
            <p className="text-sm text-gray-400">
              支持关键词、标签、分类多维度搜索，快速定位所需资源
            </p>
          </div>
          
          <div className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/20">
            <div className="text-2xl mb-3">⬇️</div>
            <h4 className="font-semibold text-white mb-2">一键下载</h4>
            <p className="text-sm text-gray-400">
              支持单个资源或批量打包下载，自动适配项目格式
            </p>
          </div>
          
          <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
            <div className="text-2xl mb-3">👥</div>
            <h4 className="font-semibold text-white mb-2">团队协作</h4>
            <p className="text-sm text-gray-400">
              项目成员管理、进度追踪、里程碑设置，高效协同
            </p>
          </div>
        </div>
        
        {/* 快速操作 */}
        <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/20">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>⚡</span>
            快速操作
          </h3>
          <div className="flex flex-wrap gap-3">
            <a 
              href="/resources/materials"
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg text-sm border border-amber-500/30 transition-all"
            >
              🎨 浏览材质库
            </a>
            <a 
              href="/resources/projects"
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm border border-emerald-500/30 transition-all"
            >
              📁 查看项目库
            </a>
            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm border border-blue-500/30 transition-all">
              ⬆️ 上传资源
            </button>
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm border border-purple-500/30 transition-all">
              ➕ 创建项目
            </button>
          </div>
        </div>
      </CategoryIntroPage>
    </MainLayout>
  )
}
