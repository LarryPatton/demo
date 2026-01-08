/**
 * CategoryIntroPage - 分类介绍页组件
 * 用于展示一级模块的总览介绍，包含子模块快速入口
 */

import { Link } from 'react-router-dom'

// 子模块配置类型
export interface SubModuleConfig {
  id: string
  label: string
  labelEn?: string
  icon: string
  description?: string
  route?: string
  count?: number
}

// 统计数据类型
export interface StatItem {
  label: string
  value: string | number
  icon: string
  color?: string
}

// 分类介绍页属性
export interface CategoryIntroProps {
  // 基础信息
  icon: string
  title: string
  titleEn: string
  description: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan'
  
  // 子模块列表
  subModules: SubModuleConfig[]
  
  // 统计数据（可选）
  stats?: StatItem[]
  
  // 额外内容（可选）
  children?: React.ReactNode
}

// 颜色映射
const colorMap = {
  blue: {
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    accent: 'blue-500',
    bg: 'blue-500/20',
    border: 'blue-500/30',
    text: 'blue-400'
  },
  green: {
    gradient: 'from-emerald-600 via-green-700 to-teal-800',
    accent: 'emerald-500',
    bg: 'emerald-500/20',
    border: 'emerald-500/30',
    text: 'emerald-400'
  },
  purple: {
    gradient: 'from-purple-600 via-violet-700 to-indigo-800',
    accent: 'purple-500',
    bg: 'purple-500/20',
    border: 'purple-500/30',
    text: 'purple-400'
  },
  orange: {
    gradient: 'from-orange-500 via-amber-600 to-yellow-700',
    accent: 'orange-500',
    bg: 'orange-500/20',
    border: 'orange-500/30',
    text: 'orange-400'
  },
  pink: {
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    accent: 'pink-500',
    bg: 'pink-500/20',
    border: 'pink-500/30',
    text: 'pink-400'
  },
  cyan: {
    gradient: 'from-cyan-500 via-teal-600 to-blue-700',
    accent: 'cyan-500',
    bg: 'cyan-500/20',
    border: 'cyan-500/30',
    text: 'cyan-400'
  }
}

export default function CategoryIntroPage({
  icon,
  title,
  titleEn,
  description,
  color,
  subModules,
  stats,
  children
}: CategoryIntroProps) {
  const colors = colorMap[color]
  
  return (
    <div className="space-y-8">
      {/* 头部横幅 */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} p-8`}>
        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-20 h-20 bg-white/5 rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          <div className="absolute bottom-5 right-10 w-12 h-12 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/15 rounded-sm rotate-12"></div>
        </div>
        
        <div className="relative z-10">
          {/* 图标和标签 */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              {icon}
            </div>
            <div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                {titleEn}
              </span>
            </div>
          </div>
          
          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          
          {/* 描述 */}
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            {description}
          </p>
          
          {/* 统计徽章 */}
          <div className="flex items-center space-x-4 mt-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 flex items-center gap-2">
              <span>📁</span>
              <span>{subModules.length} 个子模块</span>
            </span>
          </div>
        </div>
      </div>

      {/* 统计数据（如果提供） */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-${colors.accent}/50 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${colors.bg} rounded-lg flex items-center justify-center`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 子模块卡片网格 */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className={`w-6 h-6 bg-${colors.accent} rounded-lg flex items-center justify-center text-sm`}>📚</span>
          包含模块
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subModules.map((module) => (
            <Link
              key={module.id}
              to={module.route || '#'}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* 图标 */}
                <div className={`w-12 h-12 bg-${colors.bg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                
                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {module.label}
                    </h3>
                    {module.count !== undefined && (
                      <span className="px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                        {module.count}
                      </span>
                    )}
                  </div>
                  
                  {module.labelEn && (
                    <p className="text-sm text-gray-500 mb-2">{module.labelEn}</p>
                  )}
                  
                  {module.description && (
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {module.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* 箭头指示 */}
              <div className="flex justify-end mt-3">
                <span className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex items-center gap-1 text-sm">
                  进入
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 额外内容插槽 */}
      {children}
    </div>
  )
}
