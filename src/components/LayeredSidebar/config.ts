/**
 * Sidebar Module Configurations
 * Defines the navigation structure for the sidebar
 */

import { ModuleConfig } from './types'

export const moduleConfigs: ModuleConfig[] = [
  {
    id: 'art-bible',
    label: '美术圣经',
    labelEn: 'Art Bible',
    subtitle: 'Art Bible',
    icon: '📖',
    route: '/art-bible',  // 指向介绍页
    subModules: [
      {
        id: 'style-overview',
        label: '风格总览',
        labelEn: 'Style Overview',
        icon: '🎨',
        route: '/?style=style-overview'
      },
      {
        id: 'style-fantasy',
        label: '风格化幻想',
        labelEn: 'Stylized Fantasy',
        icon: '✨',
        route: '/?style=style-fantasy'
      },
      {
        id: 'style-realistic',
        label: '写实风格',
        labelEn: 'Realistic',
        icon: '🎯',
        route: '/?style=style-realistic'
      },
      {
        id: 'style-pixel',
        label: '像素艺术',
        labelEn: 'Pixel Art',
        icon: '👾',
        route: '/?style=style-pixel'
      },
      {
        id: 'style-anime',
        label: '二次元',
        labelEn: 'Anime',
        icon: '💖',
        route: '/?style=style-anime'
      }
    ]
  },
  {
    id: 'art-spec',
    label: '美术规范',
    labelEn: 'Art Spec',
    subtitle: 'Art Specification',
    icon: '📋',
    route: '/art-spec',  // 指向介绍页
    subModules: [
      {
        id: 'asset-specs',
        label: '资产规范',
        labelEn: 'Asset Specs',
        icon: '📦',
        route: '/spec',
        items: [
          { id: 'texture', label: '贴图规范', labelEn: 'Texture' },
          { id: 'model', label: '模型规范', labelEn: 'Model' },
          { id: 'animation', label: '动画规范', labelEn: 'Animation' },
          { id: 'vfx', label: '特效规范', labelEn: 'VFX' },
          { id: 'material', label: '材质规范', labelEn: 'Material' },
          { id: 'ui', label: 'UI规范', labelEn: 'UI' }
        ]
      },
      {
        id: 'project-structure',
        label: '工程结构',
        labelEn: 'Project Structure',
        icon: '📁'
      },
      {
        id: 'naming-convention',
        label: '命名规范',
        labelEn: 'Naming Convention',
        icon: '🏷️'
      },
      {
        id: 'delivery-checklist',
        label: '交付检查',
        labelEn: 'Delivery Checklist',
        icon: '✅'
      }
    ]
  },
  {
    id: 'incubation',
    label: '项目孵化',
    labelEn: 'Incubation',
    subtitle: 'Incubation',
    icon: '💡',
    route: '/incubation-intro',  // 指向介绍页
    subModules: [
      {
        id: 'submit-proposal',
        label: '提交提案',
        labelEn: 'Submit Proposal',
        icon: '📝',
        route: '/incubation'
      },
      {
        id: 'my-proposals',
        label: '我的提案',
        labelEn: 'My Proposals',
        icon: '📄'
      },
      {
        id: 'review-status',
        label: '审核状态',
        labelEn: 'Review Status',
        icon: '⏳'
      }
    ]
  },
  {
    id: 'resources',
    label: '资源整合',
    labelEn: 'Resource Hub',
    subtitle: 'Resource Hub',
    icon: '📦',
    route: '/resources-intro',  // 指向介绍页
    subModules: [
      {
        id: 'material-library',
        label: '材质库',
        labelEn: 'Material Library',
        icon: '🎨',
        route: '/resources/materials'
      },
      {
        id: 'project-library',
        label: '项目库',
        labelEn: 'Project Library',
        icon: '📁',
        route: '/resources/projects'
      }
    ]
  }
]

// Calculate total items count
export function getTotalItemsCount(): number {
  let count = 0
  moduleConfigs.forEach(module => {
    count++ // Count the module itself
    if (module.subModules) {
      module.subModules.forEach(sub => {
        count++ // Count submodule
        if (sub.items) {
          count += sub.items.length // Count items
        }
      })
    }
  })
  return count
}

// Get modules count
export function getModulesCount(): number {
  return moduleConfigs.length
}
