/**
 * Projects Data
 * 项目库示例数据
 */

export interface ProjectMilestone {
  id: string
  name: string
  status: 'pending' | 'in_progress' | 'completed'
  targetDate: string
  completedDate?: string
}

export interface ResourceCategory {
  name: string
  icon: string
  current: number
  target: number
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  isLead: boolean
}

export interface Project {
  id: string
  name: string
  nameEn: string
  description: string
  status: 'planning' | 'in_progress' | 'completed' | 'archived'
  progress: number
  coverImage: string
  tags: string[]
  milestones: ProjectMilestone[]
  resources: ResourceCategory[]
  team: TeamMember[]
  createdAt: string
  updatedAt: string
}

// 项目示例数据
export const projectsData: Project[] = [
  {
    id: 'proj-001',
    name: '幻想RPG项目',
    nameEn: 'Fantasy RPG Project',
    description: '打造一个开放世界幻想风格RPG游戏的完整美术资源库，包含角色、场景、道具、UI等全套资源。',
    status: 'in_progress',
    progress: 70,
    coverImage: 'https://picsum.photos/seed/fantasy1/800/400',
    tags: ['幻想', 'RPG', '角色', '场景', '开放世界'],
    milestones: [
      { id: 'm1', name: '概念设计完成', status: 'completed', targetDate: '2024-01', completedDate: '2024-01-15' },
      { id: 'm2', name: '角色原型完成', status: 'completed', targetDate: '2024-03', completedDate: '2024-03-20' },
      { id: 'm3', name: '场景资源制作', status: 'in_progress', targetDate: '2024-06' },
      { id: 'm4', name: 'UI/UX完成', status: 'pending', targetDate: '2024-08' },
      { id: 'm5', name: '最终审核', status: 'pending', targetDate: '2024-10' }
    ],
    resources: [
      { name: '角色', icon: '🧙', current: 12, target: 15 },
      { name: '场景', icon: '🏰', current: 8, target: 12 },
      { name: '道具', icon: '⚔️', current: 45, target: 50 },
      { name: 'UI', icon: '🎨', current: 20, target: 25 }
    ],
    team: [
      { id: 't1', name: '张三', avatar: 'https://i.pravatar.cc/40?u=1', role: '项目负责人', isLead: true },
      { id: 't2', name: '李四', avatar: 'https://i.pravatar.cc/40?u=2', role: '角色设计师', isLead: false },
      { id: 't3', name: '王五', avatar: 'https://i.pravatar.cc/40?u=3', role: '场景设计师', isLead: false },
      { id: 't4', name: '赵六', avatar: 'https://i.pravatar.cc/40?u=4', role: 'UI设计师', isLead: false },
      { id: 't5', name: '钱七', avatar: 'https://i.pravatar.cc/40?u=5', role: '3D建模师', isLead: false }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-26'
  },
  {
    id: 'proj-002',
    name: '中世纪城堡',
    nameEn: 'Medieval Castle',
    description: '构建一套完整的中世纪城堡场景资源，包含建筑、道具、装饰品等，适用于历史题材游戏。',
    status: 'in_progress',
    progress: 35,
    coverImage: 'https://picsum.photos/seed/castle1/800/400',
    tags: ['中世纪', '城堡', '建筑', '历史'],
    milestones: [
      { id: 'm1', name: '概念设计', status: 'completed', targetDate: '2024-02', completedDate: '2024-02-10' },
      { id: 'm2', name: '主建筑制作', status: 'in_progress', targetDate: '2024-05' },
      { id: 'm3', name: '细节装饰', status: 'pending', targetDate: '2024-07' },
      { id: 'm4', name: '最终优化', status: 'pending', targetDate: '2024-09' }
    ],
    resources: [
      { name: '建筑', icon: '🏰', current: 5, target: 12 },
      { name: '道具', icon: '🪑', current: 18, target: 40 },
      { name: '装饰', icon: '🏺', current: 12, target: 30 }
    ],
    team: [
      { id: 't1', name: '李四', avatar: 'https://i.pravatar.cc/40?u=6', role: '项目负责人', isLead: true },
      { id: 't2', name: '孙八', avatar: 'https://i.pravatar.cc/40?u=7', role: '建筑设计师', isLead: false },
      { id: 't3', name: '周九', avatar: 'https://i.pravatar.cc/40?u=8', role: '道具设计师', isLead: false }
    ],
    createdAt: '2024-02-01',
    updatedAt: '2024-01-24'
  },
  {
    id: 'proj-003',
    name: '科幻太空站',
    nameEn: 'Sci-Fi Space Station',
    description: '设计一个未来科幻风格的太空站场景，包含飞船、设备、角色服装等科幻元素。',
    status: 'in_progress',
    progress: 90,
    coverImage: 'https://picsum.photos/seed/scifi1/800/400',
    tags: ['科幻', '太空', '未来', '飞船'],
    milestones: [
      { id: 'm1', name: '概念设计', status: 'completed', targetDate: '2023-10', completedDate: '2023-10-15' },
      { id: 'm2', name: '主体结构', status: 'completed', targetDate: '2023-12', completedDate: '2023-12-20' },
      { id: 'm3', name: '细节制作', status: 'completed', targetDate: '2024-01', completedDate: '2024-01-18' },
      { id: 'm4', name: '最终审核', status: 'in_progress', targetDate: '2024-02' }
    ],
    resources: [
      { name: '场景', icon: '🚀', current: 8, target: 8 },
      { name: '设备', icon: '🖥️', current: 35, target: 40 },
      { name: '服装', icon: '👨‍🚀', current: 12, target: 12 },
      { name: '飞船', icon: '🛸', current: 5, target: 6 }
    ],
    team: [
      { id: 't1', name: '王五', avatar: 'https://i.pravatar.cc/40?u=9', role: '项目负责人', isLead: true },
      { id: 't2', name: '吴十', avatar: 'https://i.pravatar.cc/40?u=10', role: '概念设计师', isLead: false },
      { id: 't3', name: '郑一', avatar: 'https://i.pravatar.cc/40?u=11', role: '硬表面建模师', isLead: false },
      { id: 't4', name: '冯二', avatar: 'https://i.pravatar.cc/40?u=12', role: '材质艺术家', isLead: false },
      { id: 't5', name: '陈三', avatar: 'https://i.pravatar.cc/40?u=13', role: '灯光师', isLead: false },
      { id: 't6', name: '楚四', avatar: 'https://i.pravatar.cc/40?u=14', role: '技术美术', isLead: false },
      { id: 't7', name: '魏五', avatar: 'https://i.pravatar.cc/40?u=15', role: '动效设计师', isLead: false },
      { id: 't8', name: '蒋六', avatar: 'https://i.pravatar.cc/40?u=16', role: 'QA测试', isLead: false }
    ],
    createdAt: '2023-09-01',
    updatedAt: '2024-01-25'
  },
  {
    id: 'proj-004',
    name: '卡通农场',
    nameEn: 'Cartoon Farm',
    description: '创建一套可爱卡通风格的农场游戏资源，包含农作物、动物、建筑、角色等。',
    status: 'completed',
    progress: 100,
    coverImage: 'https://picsum.photos/seed/farm1/800/400',
    tags: ['卡通', '农场', '休闲', '可爱'],
    milestones: [
      { id: 'm1', name: '风格定义', status: 'completed', targetDate: '2023-06', completedDate: '2023-06-10' },
      { id: 'm2', name: '核心资源', status: 'completed', targetDate: '2023-08', completedDate: '2023-08-15' },
      { id: 'm3', name: '扩展资源', status: 'completed', targetDate: '2023-10', completedDate: '2023-10-20' },
      { id: 'm4', name: '项目交付', status: 'completed', targetDate: '2023-11', completedDate: '2023-11-30' }
    ],
    resources: [
      { name: '建筑', icon: '🏠', current: 15, target: 15 },
      { name: '农作物', icon: '🌾', current: 30, target: 30 },
      { name: '动物', icon: '🐄', current: 20, target: 20 },
      { name: '角色', icon: '👨‍🌾', current: 8, target: 8 }
    ],
    team: [
      { id: 't1', name: '赵六', avatar: 'https://i.pravatar.cc/40?u=17', role: '项目负责人', isLead: true },
      { id: 't2', name: '韩七', avatar: 'https://i.pravatar.cc/40?u=18', role: '角色设计师', isLead: false },
      { id: 't3', name: '杨八', avatar: 'https://i.pravatar.cc/40?u=19', role: '场景设计师', isLead: false }
    ],
    createdAt: '2023-05-01',
    updatedAt: '2023-11-30'
  },
  {
    id: 'proj-005',
    name: '赛博朋克街道',
    nameEn: 'Cyberpunk Street',
    description: '打造一个霓虹灯闪烁的赛博朋克风格城市街道场景，充满未来感和反乌托邦氛围。',
    status: 'planning',
    progress: 10,
    coverImage: 'https://picsum.photos/seed/cyber1/800/400',
    tags: ['赛博朋克', '城市', '霓虹', '未来'],
    milestones: [
      { id: 'm1', name: '概念收集', status: 'in_progress', targetDate: '2024-03' },
      { id: 'm2', name: '风格定义', status: 'pending', targetDate: '2024-04' },
      { id: 'm3', name: '原型制作', status: 'pending', targetDate: '2024-06' },
      { id: 'm4', name: '完整制作', status: 'pending', targetDate: '2024-10' }
    ],
    resources: [
      { name: '建筑', icon: '🏙️', current: 2, target: 20 },
      { name: '道具', icon: '📺', current: 5, target: 50 },
      { name: '灯光', icon: '💡', current: 3, target: 30 }
    ],
    team: [
      { id: 't1', name: '钱七', avatar: 'https://i.pravatar.cc/40?u=20', role: '项目负责人', isLead: true },
      { id: 't2', name: '孙八', avatar: 'https://i.pravatar.cc/40?u=21', role: '概念设计师', isLead: false }
    ],
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20'
  }
]

// 最近更新记录
export interface UpdateRecord {
  id: string
  type: 'material' | 'project'
  icon: string
  title: string
  author: string
  time: string
}

export const recentUpdates: UpdateRecord[] = [
  { id: 'u1', type: 'material', icon: '🎨', title: '新增材质「风化岩石_v2」', author: '张三', time: '2小时前' },
  { id: 'u2', type: 'project', icon: '📁', title: '项目「幻想RPG」更新至v1.3', author: '李四', time: '5小时前' },
  { id: 'u3', type: 'material', icon: '🎨', title: '新增材质「哑光金属系列」', author: '王五', time: '1天前' },
  { id: 'u4', type: 'project', icon: '📁', title: '项目「科幻太空站」完成里程碑', author: '赵六', time: '2天前' },
  { id: 'u5', type: 'material', icon: '🎨', title: '更新材质「大理石」至4K版本', author: '钱七', time: '3天前' }
]

// 获取项目统计
export function getProjectStats() {
  const total = projectsData.length
  const inProgress = projectsData.filter(p => p.status === 'in_progress').length
  const completed = projectsData.filter(p => p.status === 'completed').length
  const planning = projectsData.filter(p => p.status === 'planning').length
  
  return { total, inProgress, completed, planning }
}

// 按状态筛选项目
export function getProjectsByStatus(status: string): Project[] {
  if (status === 'all') return projectsData
  return projectsData.filter(p => p.status === status)
}

// 搜索项目
export function searchProjects(query: string): Project[] {
  const lowerQuery = query.toLowerCase()
  return projectsData.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.nameEn.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
