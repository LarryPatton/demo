/**
 * ProjectLibrary Page - 项目库页面
 * 展示项目列表、进度追踪、状态筛选、详情查看
 */

import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import { projectsData, getProjectStats, Project } from '../data/projectsData'

// 项目状态配置
const statusConfig = {
  planning: { label: '规划中', color: 'yellow', icon: '📋' },
  in_progress: { label: '进行中', color: 'blue', icon: '🔄' },
  completed: { label: '已完成', color: 'green', icon: '✅' },
  archived: { label: '已归档', color: 'gray', icon: '📦' }
}

// 项目详情弹窗组件
function ProjectDetailModal({ 
  project, 
  onClose 
}: { 
  project: Project | null
  onClose: () => void 
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'team' | 'milestones'>('overview')
  
  if (!project) return null
  
  const status = statusConfig[project.status]
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        {/* 头部 */}
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <img 
              src={project.coverImage} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          </div>
          
          {/* 关闭按钮 */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
          
          {/* 标题区 */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${status.color}-500/20 text-${status.color}-400 border border-${status.color}-500/30`}>
                {status.icon} {status.label}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            <p className="text-gray-400 text-sm">{project.nameEn}</p>
          </div>
        </div>
        
        {/* Tab 导航 */}
        <div className="border-b border-gray-800 px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: '📊 概览' },
              { id: 'resources', label: '📦 资源' },
              { id: 'team', label: '👥 团队' },
              { id: 'milestones', label: '🎯 里程碑' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* 内容区 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-320px)]">
          {/* 概览 Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 进度 */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">总体进度</span>
                  <span className="text-2xl font-bold text-white">{project.progress}%</span>
                </div>
                <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all bg-gradient-to-r ${
                      project.progress >= 80 ? 'from-green-500 to-green-400' :
                      project.progress >= 50 ? 'from-blue-500 to-blue-400' :
                      'from-yellow-500 to-yellow-400'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* 描述 */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">项目描述</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>
              
              {/* 标签 */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 资源统计 */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">资源进度</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.resources.map(res => (
                    <div key={res.name} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{res.icon}</span>
                        <span className="text-gray-300">{res.name}</span>
                      </div>
                      <div className="text-lg font-bold text-white mb-1">
                        {res.current}/{res.target}
                      </div>
                      <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(res.current / res.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 资源 Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {project.resources.map(res => (
                <div key={res.name} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{res.icon}</span>
                      <div>
                        <h4 className="text-white font-medium">{res.name}</h4>
                        <p className="text-sm text-gray-500">已完成 {res.current}/{res.target}</p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${
                      res.current === res.target ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {Math.round((res.current / res.target) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        res.current === res.target ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(res.current / res.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 团队 Tab */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.team.map(member => (
                <div 
                  key={member.id} 
                  className={`bg-gray-800/30 rounded-xl p-4 border transition-colors ${
                    member.isLead ? 'border-yellow-500/50' : 'border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{member.name}</span>
                        {member.isLead && (
                          <span className="text-xs text-yellow-400">👑</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 里程碑 Tab */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <div 
                  key={milestone.id}
                  className="flex items-start gap-4"
                >
                  {/* 时间线 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in_progress' ? 'bg-blue-500' :
                      'bg-gray-700'
                    }`}>
                      {milestone.status === 'completed' ? '✓' :
                       milestone.status === 'in_progress' ? '🔄' : '⏳'}
                    </div>
                    {index < project.milestones.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-700'
                      }`}></div>
                    )}
                  </div>
                  
                  {/* 内容 */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">{milestone.name}</h4>
                      <span className={`text-sm ${
                        milestone.status === 'completed' ? 'text-green-400' :
                        milestone.status === 'in_progress' ? 'text-blue-400' :
                        'text-gray-500'
                      }`}>
                        {milestone.completedDate || milestone.targetDate}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      milestone.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-700/50 text-gray-400'
                    }`}>
                      {milestone.status === 'completed' ? '已完成' :
                       milestone.status === 'in_progress' ? '进行中' : '待开始'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 底部操作 */}
        <div className="p-6 border-t border-gray-800 flex gap-4">
          <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            📂 查看详情
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
            ✏️ 编辑
          </button>
        </div>
      </div>
    </div>
  )
}

// 项目卡片组件
function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: Project
  onClick: () => void 
}) {
  const status = statusConfig[project.status]
  
  return (
    <div 
      onClick={onClick}
      className="group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all"
    >
      {/* 封面 */}
      <div className="aspect-[2/1] overflow-hidden relative">
        <img 
          src={project.coverImage} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        
        {/* 状态徽章 */}
        <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-${status.color}-500/20 text-${status.color}-400 border border-${status.color}-500/30 backdrop-blur-sm`}>
          {status.icon} {status.label}
        </span>
        
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg">{project.name}</h3>
          <p className="text-gray-400 text-sm truncate">{project.description}</p>
        </div>
      </div>
      
      {/* 信息 */}
      <div className="p-4">
        {/* 进度条 */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">进度</span>
            <span className={`font-medium ${
              project.progress >= 80 ? 'text-green-400' :
              project.progress >= 50 ? 'text-blue-400' :
              'text-yellow-400'
            }`}>{project.progress}%</span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all bg-gradient-to-r ${
                project.progress >= 80 ? 'from-green-500 to-green-400' :
                project.progress >= 50 ? 'from-blue-500 to-blue-400' :
                'from-yellow-500 to-yellow-400'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* 资源统计 */}
        <div className="flex items-center gap-3 mb-3">
          {project.resources.slice(0, 3).map(res => (
            <div key={res.name} className="flex items-center gap-1 text-xs text-gray-400">
              <span>{res.icon}</span>
              <span>{res.current}/{res.target}</span>
            </div>
          ))}
        </div>
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* 团队头像 */}
            <div className="flex -space-x-2">
              {project.team.slice(0, 3).map(member => (
                <img 
                  key={member.id}
                  src={member.avatar} 
                  alt={member.name}
                  className="w-6 h-6 rounded-full border-2 border-gray-800"
                  title={member.name}
                />
              ))}
              {project.team.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-gray-400">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">{project.team.length}人</span>
          </div>
          
          {/* 标签 */}
          <div className="flex gap-1">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectLibrary() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const projectStats = getProjectStats()
  
  // 筛选项目
  const filteredProjects = useMemo(() => {
    let result = projectsData
    
    // 状态筛选
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter)
    }
    
    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return result
  }, [statusFilter, searchQuery])

  return (
    <MainLayout>
      {/* 页面标题 */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">项目库</h1>
              <p className="text-sm text-gray-400">Project Library - 共 {projectStats.total} 个项目</p>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <span>+</span>
            创建新项目
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-xl border transition-all ${
              statusFilter === 'all'
                ? 'bg-blue-600/20 border-blue-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-white">{projectStats.total}</div>
            <div className="text-sm text-gray-400">全部项目</div>
          </button>
          
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`p-4 rounded-xl border transition-all ${
              statusFilter === 'in_progress'
                ? 'bg-blue-600/20 border-blue-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-blue-400">{projectStats.inProgress}</div>
            <div className="text-sm text-gray-400">🔄 进行中</div>
          </button>
          
          <button
            onClick={() => setStatusFilter('completed')}
            className={`p-4 rounded-xl border transition-all ${
              statusFilter === 'completed'
                ? 'bg-blue-600/20 border-blue-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-green-400">{projectStats.completed}</div>
            <div className="text-sm text-gray-400">✅ 已完成</div>
          </button>
          
          <button
            onClick={() => setStatusFilter('planning')}
            className={`p-4 rounded-xl border transition-all ${
              statusFilter === 'planning'
                ? 'bg-blue-600/20 border-blue-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-yellow-400">{projectStats.planning}</div>
            <div className="text-sm text-gray-400">📋 规划中</div>
          </button>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索项目名称、标签..."
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none"
            >
              <option value="all">全部状态</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="planning">规划中</option>
            </select>
            
            <select className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none">
              <option>最近更新</option>
              <option>创建时间</option>
              <option>进度排序</option>
              <option>名称排序</option>
            </select>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
        {/* 空状态 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-gray-400">未找到匹配的项目</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
              }}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
      
      {/* 项目详情弹窗 */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </MainLayout>
  )
}
