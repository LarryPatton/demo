/**
 * IncubationIntro - 项目孵化介绍页
 * 展示项目孵化模块的概览和功能入口
 */

import MainLayout from '../../components/MainLayout'
import CategoryIntroPage from '../../components/CategoryIntroPage'

// 子模块配置
const subModules = [
  {
    id: 'submit-proposal',
    label: '提交提案',
    labelEn: 'Submit Proposal',
    icon: '📝',
    description: '发起新的创意提案，描述你的想法和实现方案',
    route: '/incubation/submit'
  },
  {
    id: 'my-proposals',
    label: '我的提案',
    labelEn: 'My Proposals',
    icon: '📄',
    description: '查看和管理你提交的所有提案及其状态',
    route: '/incubation/my-proposals'
  },
  {
    id: 'review-status',
    label: '审核状态',
    labelEn: 'Review Status',
    icon: '⏳',
    description: '追踪提案审核进度，查看评审意见',
    route: '/incubation/review'
  },
  {
    id: 'showcase',
    label: '成果展示',
    labelEn: 'Showcase',
    icon: '🏆',
    description: '已落地项目的展示，优秀案例分享',
    route: '/incubation/showcase'
  },
  {
    id: 'guidelines',
    label: '提案指南',
    labelEn: 'Guidelines',
    icon: '📖',
    description: '如何撰写优质提案，提高通过率的技巧',
    route: '/incubation/guidelines'
  }
]

// 统计数据
const stats = [
  { label: '待审核', value: 8, icon: '⏳' },
  { label: '进行中', value: 12, icon: '🔄' },
  { label: '已完成', value: 45, icon: '✅' },
  { label: '本月新增', value: 6, icon: '📈' }
]

export default function IncubationIntro() {
  return (
    <MainLayout>
      <CategoryIntroPage
        icon="💡"
        title="项目孵化"
        titleEn="Project Incubation"
        description="提交你的创意提案，追踪审核进度，推动创新想法落地实现。这里是创意的起点，每一个伟大项目都始于一个小想法。"
        color="purple"
        subModules={subModules}
        stats={stats}
      >
        {/* 孵化流程 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔄</span>
            孵化流程
          </h3>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {[
              { step: 1, label: '提交提案', icon: '📝', desc: '描述创意想法' },
              { step: 2, label: '初审评估', icon: '👀', desc: '团队可行性评估' },
              { step: 3, label: '深度评审', icon: '🔍', desc: '技术方案讨论' },
              { step: 4, label: '立项开发', icon: '🚀', desc: '分配资源启动' },
              { step: 5, label: '成果展示', icon: '🏆', desc: '项目交付上线' }
            ].map((item, index, arr) => (
              <div key={item.step} className="flex items-center gap-4 flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl border border-purple-500/30">
                    {item.icon}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </div>
                {index < arr.length - 1 && (
                  <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 to-purple-500/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 提示信息 */}
        <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>💡</span>
            提案小贴士
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span>清晰描述问题和解决方案</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span>提供可行的技术实现路径</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span>评估预期收益和资源投入</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span>附上参考案例或原型设计</span>
            </div>
          </div>
        </div>
      </CategoryIntroPage>
    </MainLayout>
  )
}
