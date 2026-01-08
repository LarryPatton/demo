/**
 * ArtBibleIntro - 美术圣经介绍页
 * 展示美术圣经模块的概览和风格子模块入口
 */

import MainLayout from '../../components/MainLayout'
import CategoryIntroPage from '../../components/CategoryIntroPage'

// 子模块配置
const subModules = [
  {
    id: 'style-overview',
    label: '风格总览',
    labelEn: 'Style Overview',
    icon: '🎨',
    description: '整体美术风格定义，包括视觉基调、色彩倾向、设计原则',
    route: '/art-bible/style-overview'
  },
  {
    id: 'style-fantasy',
    label: '风格化幻想',
    labelEn: 'Stylized Fantasy',
    icon: '✨',
    description: '魔法奇幻风格指南，卡通化造型与幻想元素设计规范',
    route: '/art-bible/style-fantasy'
  },
  {
    id: 'style-realistic',
    label: '写实风格',
    labelEn: 'Realistic Style',
    icon: '🎯',
    description: '真实感视觉呈现，光影、材质、比例的写实表现方法',
    route: '/art-bible/style-realistic'
  },
  {
    id: 'style-pixel',
    label: '像素艺术',
    labelEn: 'Pixel Art',
    icon: '👾',
    description: '复古像素风格规范，分辨率、调色板、动画帧设计',
    route: '/art-bible/style-pixel'
  },
  {
    id: 'style-anime',
    label: '二次元风格',
    labelEn: 'Anime Style',
    icon: '💖',
    description: '日系动漫美术风格，角色设计、表情系统、场景氛围',
    route: '/art-bible/style-anime'
  }
]

// 统计数据
const stats = [
  { label: '风格类型', value: 5, icon: '🎨' },
  { label: '设计规范', value: 24, icon: '📐' },
  { label: '示例资产', value: '120+', icon: '🖼️' },
  { label: '参考案例', value: 18, icon: '📚' }
]

export default function ArtBibleIntro() {
  return (
    <MainLayout>
      <CategoryIntroPage
        icon="📖"
        title="美术圣经"
        titleEn="Art Bible"
        description="定义游戏的视觉风格、色彩方案、角色与场景设计规范，确保整个项目的美术风格统一连贯。美术圣经是项目视觉表达的核心指导文档。"
        color="blue"
        subModules={subModules}
        stats={stats}
      >
        {/* 额外内容区 */}
        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>💡</span>
            使用指南
          </h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            美术圣经是项目美术方向的权威参考，所有美术资产的制作都应遵循本文档中的风格定义。
            建议先阅读「风格总览」了解整体方向，再根据具体需求查阅对应的风格指南。
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
              #视觉风格
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
              #色彩规范
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
              #角色设计
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
              #场景氛围
            </span>
          </div>
        </div>
      </CategoryIntroPage>
    </MainLayout>
  )
}
