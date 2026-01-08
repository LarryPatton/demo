/**
 * ArtSpecIntro - 美术规范介绍页
 * 展示美术规范模块的概览和规范子模块入口
 */

import MainLayout from '../../components/MainLayout'
import CategoryIntroPage from '../../components/CategoryIntroPage'

// 子模块配置
const subModules = [
  {
    id: 'texture',
    label: '贴图规范',
    labelEn: 'Texture Specification',
    icon: '🖼️',
    description: '贴图尺寸、格式、压缩方式、命名规则等技术标准',
    route: '/spec/texture'
  },
  {
    id: 'model',
    label: '模型规范',
    labelEn: 'Model Specification',
    icon: '📐',
    description: '多边形预算、拓扑结构、LOD层级、导出设置',
    route: '/spec/model'
  },
  {
    id: 'animation',
    label: '动画规范',
    labelEn: 'Animation Specification',
    icon: '🎬',
    description: '骨骼绑定、动画帧率、状态机设计、重定向规范',
    route: '/spec/animation'
  },
  {
    id: 'vfx',
    label: '特效规范',
    labelEn: 'VFX Specification',
    icon: '✨',
    description: '粒子系统、Shader效果、性能预算、分层渲染',
    route: '/spec/vfx'
  },
  {
    id: 'material',
    label: '材质规范',
    labelEn: 'Material Specification',
    icon: '🎨',
    description: 'PBR工作流、材质实例、参数规范、着色器使用',
    route: '/spec/material'
  },
  {
    id: 'ui',
    label: 'UI规范',
    labelEn: 'UI Specification',
    icon: '📱',
    description: '界面设计规范、图标尺寸、字体使用、适配方案',
    route: '/spec/ui'
  },
  {
    id: 'project-structure',
    label: '工程结构',
    labelEn: 'Project Structure',
    icon: '📁',
    description: '项目文件夹结构、资产分类、版本管理规范',
    route: '/spec/project-structure'
  },
  {
    id: 'naming-convention',
    label: '命名规范',
    labelEn: 'Naming Convention',
    icon: '🏷️',
    description: '资产命名规则、前缀后缀约定、多语言命名',
    route: '/spec/naming'
  },
  {
    id: 'delivery-checklist',
    label: '交付检查',
    labelEn: 'Delivery Checklist',
    icon: '✅',
    description: '资产交付前的自检清单、常见问题排查',
    route: '/spec/checklist'
  }
]

// 统计数据
const stats = [
  { label: '规范类型', value: 9, icon: '📋' },
  { label: '检查项', value: '86+', icon: '✅' },
  { label: '模板文件', value: 15, icon: '📄' },
  { label: '最佳实践', value: 32, icon: '💡' }
]

export default function ArtSpecIntro() {
  return (
    <MainLayout>
      <CategoryIntroPage
        icon="📋"
        title="美术规范"
        titleEn="Art Specification"
        description="详细的资产制作技术规范，涵盖贴图、模型、动画、特效等各类资产的制作标准，确保资产质量统一、性能可控、协作顺畅。"
        color="green"
        subModules={subModules}
        stats={stats}
      >
        {/* 额外内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span>🎯</span>
              规范目标
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>确保资产制作质量统一，减少返工</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>优化运行性能，控制内存占用</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>规范团队协作，提高工作效率</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>便于资产复用和项目迁移</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span>📌</span>
              快速链接
            </h3>
            <div className="space-y-2">
              <a href="/spec/checklist" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 text-sm">
                📋 交付前自检清单
              </a>
              <a href="/spec/naming" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 text-sm">
                🏷️ 命名规范速查
              </a>
              <a href="/spec/project-structure" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 text-sm">
                📁 工程结构模板
              </a>
            </div>
          </div>
        </div>
      </CategoryIntroPage>
    </MainLayout>
  )
}
