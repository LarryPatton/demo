/**
 * HubIntroPage - 资源中心总览介绍页面
 * 展示平台介绍、模块概览、统计数据、发展路线图
 */

import { Link } from 'react-router-dom'

// 模块介绍数据
const modules = [
  {
    id: 'art-bible',
    icon: '📖',
    title: '美术圣经',
    subtitle: 'Art Bible',
    description: '定义游戏的视觉风格、色彩方案、角色设计规范，确保整个项目的美术风格统一。',
    features: ['风格定义', '色彩规范', '角色设计', '场景风格'],
    color: 'blue',
    route: '/'
  },
  {
    id: 'art-spec',
    icon: '📋',
    title: '美术规范',
    subtitle: 'Art Specification',
    description: '详细的资产制作规范，包括贴图、模型、动画等技术标准，保证资产质量和性能。',
    features: ['贴图规范', '模型规范', '动画规范', '特效规范'],
    color: 'green',
    route: '/spec'
  },
  {
    id: 'incubation',
    icon: '💡',
    title: '项目孵化',
    subtitle: 'Project Incubation',
    description: '提交创意提案，追踪审核进度，推动创新想法落地实现。',
    features: ['提案提交', '进度追踪', '协作讨论', '成果展示'],
    color: 'purple',
    route: '/incubation'
  },
  {
    id: 'resources',
    icon: '📦',
    title: '资源整合',
    subtitle: 'Resource Hub',
    description: '集中管理材质库和项目库，提供统一的资源搜索、下载和协作功能。',
    features: ['材质库', '项目库', '资源搜索', '团队协作'],
    color: 'orange',
    route: '/resources'
  }
]

// 平台统计数据
const stats = [
  { label: '模块总数', value: '4', icon: '📦' },
  { label: '材质资源', value: '256+', icon: '🎨' },
  { label: '项目库', value: '5', icon: '📁' },
  { label: '规范标准', value: '6', icon: '📐' }
]

// 近期规划
const nearTermPlans = [
  { name: '完善美术圣经风格指南', priority: 'high', eta: '本周' },
  { name: '添加更多资产规范模板', priority: 'medium', eta: '本月' },
  { name: '项目孵化工作流优化', priority: 'medium', eta: '本月' },
  { name: '多语言支持', priority: 'low', eta: '下月' }
]

// 长期规划
const longTermPlans = [
  { name: 'AI 辅助资产审核', status: 'research', quarter: 'Q2 2025' },
  { name: '在线协作编辑', status: 'planning', quarter: 'Q3 2025' },
  { name: '资产版本管理', status: 'planning', quarter: 'Q3 2025' },
  { name: '社区资源共享', status: 'research', quarter: 'Q4 2025' }
]

export default function HubIntroPage() {
  return (
    <div className="space-y-8">
      {/* 欢迎横幅 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8">
        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-8 h-8 bg-white/15 rounded-sm rotate-12"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">🎮</span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
              Game Art Hub
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            游戏美术资源中心
          </h1>
          
          <p className="text-xl text-white/90 mb-4 max-w-3xl">
            一站式游戏美术管理平台，统一风格规范、资产标准与创意孵化
          </p>
          
          <div className="flex items-center space-x-2 mb-6">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20">
              #美术规范
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20">
              #风格指南
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20">
              #项目孵化
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20">
              #资源整合
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link 
              to="/"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-white/90 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>开始探索</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 模块介绍 */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            📚
          </span>
          核心模块
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map(module => (
            <Link
              key={module.id}
              to={module.route}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-${module.color}-500/20`}>
                  {module.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-500">{module.subtitle}</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {module.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {module.features.map((feature, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex items-center text-blue-400 text-sm group-hover:translate-x-2 transition-transform">
                <span>进入模块</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 统计数据 */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-sm">
            📊
          </span>
          平台概览
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 发展路线图 */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            🚀
          </span>
          发展路线图
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 近期规划 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">
                ⚡
              </span>
              近期规划
            </h3>
            
            <div className="space-y-2">
              {nearTermPlans.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.priority === 'high' ? 'bg-red-400' :
                      item.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.eta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 长期规划 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">
                🎯
              </span>
              长期规划
            </h3>
            
            <div className="space-y-2">
              {longTermPlans.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded text-xs ${
                      item.status === 'planning' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.status === 'planning' ? '规划中' : '调研中'}
                    </div>
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.quarter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 联系与贡献 */}
      <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">
            💡
          </span>
          参与贡献
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          欢迎参与平台建设，提交规范文档、分享经验心得、或提出功能建议。
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm border border-blue-500/30 transition-all duration-200">
            提交反馈
          </button>
          <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm border border-purple-500/30 transition-all duration-200">
            贡献文档
          </button>
          <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm border border-green-500/30 transition-all duration-200">
            联系我们
          </button>
        </div>
      </div>
    </div>
  )
}
