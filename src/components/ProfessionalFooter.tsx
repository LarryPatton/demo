/**
 * ProfessionalFooter Component
 * Clean and professional footer with links and copyright
 * Matches Version5 design style
 */

import { Link } from 'react-router-dom'
import { useI18n } from '../hooks/useI18n'

// Footer link section
interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

function ProfessionalFooter() {
  const { locale } = useI18n()
  const currentYear = new Date().getFullYear()
  
  // Footer sections - bilingual support
  const sections: FooterSection[] = locale === 'en-US' ? [
    {
      title: 'Resources',
      links: [
        { label: 'Art Bible', href: '/' },
        { label: 'Art Specifications', href: '/spec' },
        { label: 'Project Incubation', href: '/incubation' }
      ]
    },
    {
      title: 'Documentation',
      links: [
        { label: 'Getting Started', href: '#' },
        { label: 'Asset Guidelines', href: '#' },
        { label: 'Best Practices', href: '#' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: '#' },
        { label: 'Discord', href: '#' },
        { label: 'Feedback', href: '#' }
      ]
    }
  ] : [
    {
      title: '资源',
      links: [
        { label: '美术圣经', href: '/' },
        { label: '美术规范', href: '/spec' },
        { label: '项目孵化', href: '/incubation' }
      ]
    },
    {
      title: '文档',
      links: [
        { label: '快速入门', href: '#' },
        { label: '资产指南', href: '#' },
        { label: '最佳实践', href: '#' }
      ]
    },
    {
      title: '社区',
      links: [
        { label: 'GitHub', href: '#' },
        { label: 'Discord', href: '#' },
        { label: '反馈建议', href: '#' }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
                🎮
              </span>
              <div>
                <h3 className="text-white font-bold text-lg">Game Art Hub</h3>
                <p className="text-gray-500 text-xs">
                  {locale === 'en-US' ? 'Art Resource Center' : '美术资源中心'}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {locale === 'en-US' 
                ? 'A unified platform for game art standards, style guides, and project incubation.'
                : '统一的游戏美术标准、风格指南和项目孵化平台。'
              }
            </p>
          </div>
          
          {/* Link Sections */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Game Art Hub. {locale === 'en-US' ? 'All rights reserved.' : '保留所有权利。'}
            </p>
            
            {/* Secondary Links */}
            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {locale === 'en-US' ? 'Privacy Policy' : '隐私政策'}
              </button>
              <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {locale === 'en-US' ? 'Terms of Service' : '服务条款'}
              </button>
              <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {locale === 'en-US' ? 'Contact' : '联系我们'}
              </button>
            </div>
            
            {/* Tech Stack Badge */}
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <span>Built with</span>
              <span className="text-blue-500">React</span>
              <span>+</span>
              <span className="text-cyan-500">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ProfessionalFooter
