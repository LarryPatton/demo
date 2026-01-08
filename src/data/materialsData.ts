/**
 * Materials Data
 * 材质库示例数据
 */

export interface Material {
  id: string
  name: string
  nameEn: string
  category: 'stone' | 'metal' | 'wood' | 'fabric' | 'special' | 'nature'
  subcategory: string
  resolution: '1K' | '2K' | '4K' | '8K'
  format: 'PNG' | 'JPG' | 'EXR' | 'TGA'
  type: 'PBR' | 'Stylized' | 'Basic'
  fileSize: string
  tags: string[]
  description: string
  thumbnailUrl: string
  stats: {
    downloads: number
    favorites: number
    rating: number
  }
  author: string
  createdAt: string
  updatedAt: string
}

export interface MaterialCategory {
  id: string
  name: string
  nameEn: string
  icon: string
  count: number
  subcategories: string[]
}

// 材质分类
export const materialCategories: MaterialCategory[] = [
  {
    id: 'stone',
    name: '石材',
    nameEn: 'Stone',
    icon: '🪨',
    count: 45,
    subcategories: ['大理石', '花岗岩', '砖石', '风化岩', '鹅卵石', '混凝土']
  },
  {
    id: 'metal',
    name: '金属',
    nameEn: 'Metal',
    icon: '⚙️',
    count: 68,
    subcategories: ['钢铁', '铜', '金', '银', '铝', '锈蚀金属']
  },
  {
    id: 'wood',
    name: '木材',
    nameEn: 'Wood',
    icon: '🌳',
    count: 32,
    subcategories: ['橡木', '松木', '胡桃木', '竹子', '树皮']
  },
  {
    id: 'fabric',
    name: '布料',
    nameEn: 'Fabric',
    icon: '👕',
    count: 54,
    subcategories: ['棉布', '丝绸', '皮革', '牛仔', '针织']
  },
  {
    id: 'special',
    name: '特殊',
    nameEn: 'Special',
    icon: '💎',
    count: 28,
    subcategories: ['水晶', '玻璃', '冰', '火焰', '魔法']
  },
  {
    id: 'nature',
    name: '自然',
    nameEn: 'Nature',
    icon: '🌿',
    count: 29,
    subcategories: ['草地', '泥土', '沙子', '雪', '苔藓']
  }
]

// 材质示例数据
export const materialsData: Material[] = [
  {
    id: 'mat-001',
    name: '白色大理石',
    nameEn: 'White Marble',
    category: 'stone',
    subcategory: '大理石',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '45MB',
    tags: ['石材', '大理石', '室内', '高光', '4K', 'PBR'],
    description: '高品质白色大理石材质，适用于室内地板、墙面、雕塑等场景。包含完整PBR贴图集。',
    thumbnailUrl: 'https://picsum.photos/seed/marble1/400/300',
    stats: { downloads: 234, favorites: 89, rating: 4.8 },
    author: '张三',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'mat-002',
    name: '灰色花岗岩',
    nameEn: 'Grey Granite',
    category: 'stone',
    subcategory: '花岗岩',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '42MB',
    tags: ['石材', '花岗岩', '室外', '4K', 'PBR'],
    description: '自然纹理灰色花岗岩材质，适用于建筑外墙、地面等场景。',
    thumbnailUrl: 'https://picsum.photos/seed/granite1/400/300',
    stats: { downloads: 189, favorites: 67, rating: 4.6 },
    author: '李四',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'mat-003',
    name: '红砖墙',
    nameEn: 'Red Brick Wall',
    category: 'stone',
    subcategory: '砖石',
    resolution: '2K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '28MB',
    tags: ['石材', '砖墙', '建筑', '2K', 'PBR'],
    description: '经典红砖墙材质，带有自然风化效果，适用于复古建筑场景。',
    thumbnailUrl: 'https://picsum.photos/seed/brick1/400/300',
    stats: { downloads: 156, favorites: 45, rating: 4.5 },
    author: '王五',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: 'mat-004',
    name: '风化岩石',
    nameEn: 'Weathered Rock',
    category: 'stone',
    subcategory: '风化岩',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '48MB',
    tags: ['石材', '岩石', '自然', '4K', 'PBR'],
    description: '自然风化岩石材质，带有苔藓和裂纹细节，适用于户外自然场景。',
    thumbnailUrl: 'https://picsum.photos/seed/rock1/400/300',
    stats: { downloads: 98, favorites: 34, rating: 4.7 },
    author: '赵六',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12'
  },
  {
    id: 'mat-005',
    name: '拉丝不锈钢',
    nameEn: 'Brushed Steel',
    category: 'metal',
    subcategory: '钢铁',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '35MB',
    tags: ['金属', '不锈钢', '工业', '4K', 'PBR'],
    description: '高质量拉丝不锈钢材质，适用于现代工业风格场景。',
    thumbnailUrl: 'https://picsum.photos/seed/steel1/400/300',
    stats: { downloads: 312, favorites: 128, rating: 4.9 },
    author: '张三',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25'
  },
  {
    id: 'mat-006',
    name: '铜绿金属',
    nameEn: 'Patina Copper',
    category: 'metal',
    subcategory: '铜',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '38MB',
    tags: ['金属', '铜', '氧化', '4K', 'PBR'],
    description: '带有铜绿氧化效果的铜金属材质，适用于复古或蒸汽朋克风格场景。',
    thumbnailUrl: 'https://picsum.photos/seed/copper1/400/300',
    stats: { downloads: 176, favorites: 89, rating: 4.7 },
    author: '李四',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22'
  },
  {
    id: 'mat-007',
    name: '橡木地板',
    nameEn: 'Oak Floor',
    category: 'wood',
    subcategory: '橡木',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '40MB',
    tags: ['木材', '橡木', '地板', '室内', '4K', 'PBR'],
    description: '高品质橡木地板材质，自然木纹纹理，适用于室内家居场景。',
    thumbnailUrl: 'https://picsum.photos/seed/oak1/400/300',
    stats: { downloads: 267, favorites: 112, rating: 4.8 },
    author: '王五',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: 'mat-008',
    name: '皮革',
    nameEn: 'Leather',
    category: 'fabric',
    subcategory: '皮革',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '32MB',
    tags: ['布料', '皮革', '家具', '4K', 'PBR'],
    description: '高质量皮革材质，细腻纹理，适用于家具、服装等场景。',
    thumbnailUrl: 'https://picsum.photos/seed/leather1/400/300',
    stats: { downloads: 198, favorites: 76, rating: 4.6 },
    author: '赵六',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21'
  },
  {
    id: 'mat-009',
    name: '魔法水晶',
    nameEn: 'Magic Crystal',
    category: 'special',
    subcategory: '水晶',
    resolution: '4K',
    format: 'PNG',
    type: 'Stylized',
    fileSize: '25MB',
    tags: ['特殊', '水晶', '魔法', '幻想', '4K'],
    description: '带有魔法光效的水晶材质，适用于幻想风格游戏场景。',
    thumbnailUrl: 'https://picsum.photos/seed/crystal1/400/300',
    stats: { downloads: 345, favorites: 167, rating: 4.9 },
    author: '张三',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-26'
  },
  {
    id: 'mat-010',
    name: '草地',
    nameEn: 'Grass',
    category: 'nature',
    subcategory: '草地',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '36MB',
    tags: ['自然', '草地', '户外', '4K', 'PBR'],
    description: '自然草地材质，带有野花和杂草细节，适用于户外自然场景。',
    thumbnailUrl: 'https://picsum.photos/seed/grass1/400/300',
    stats: { downloads: 289, favorites: 134, rating: 4.7 },
    author: '李四',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-23'
  },
  {
    id: 'mat-011',
    name: '沙漠沙地',
    nameEn: 'Desert Sand',
    category: 'nature',
    subcategory: '沙子',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '30MB',
    tags: ['自然', '沙子', '沙漠', '4K', 'PBR'],
    description: '细腻沙漠沙地材质，带有风纹效果，适用于沙漠场景。',
    thumbnailUrl: 'https://picsum.photos/seed/sand1/400/300',
    stats: { downloads: 145, favorites: 56, rating: 4.5 },
    author: '王五',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-17'
  },
  {
    id: 'mat-012',
    name: '锈蚀金属',
    nameEn: 'Rusted Metal',
    category: 'metal',
    subcategory: '锈蚀金属',
    resolution: '4K',
    format: 'PNG',
    type: 'PBR',
    fileSize: '42MB',
    tags: ['金属', '锈蚀', '废墟', '4K', 'PBR'],
    description: '高度锈蚀的金属材质，适用于废墟、末日风格场景。',
    thumbnailUrl: 'https://picsum.photos/seed/rust1/400/300',
    stats: { downloads: 223, favorites: 98, rating: 4.8 },
    author: '赵六',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-24'
  }
]

// 热门材质标签
export const popularTags = ['PBR', '4K', '风格化', '写实', '室内', '室外', '幻想', '科幻']

// 获取材质总数
export function getTotalMaterialsCount(): number {
  return materialCategories.reduce((sum, cat) => sum + cat.count, 0)
}

// 按分类筛选材质
export function getMaterialsByCategory(category: string): Material[] {
  if (category === 'all') return materialsData
  return materialsData.filter(m => m.category === category)
}

// 搜索材质
export function searchMaterials(query: string): Material[] {
  const lowerQuery = query.toLowerCase()
  return materialsData.filter(m => 
    m.name.toLowerCase().includes(lowerQuery) ||
    m.nameEn.toLowerCase().includes(lowerQuery) ||
    m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
