import { useState, useRef } from 'react'
import MainLayout from '../components/MainLayout'
import { ToastContainer, useToast } from '../components/Toast'
import { useI18n } from '../hooks/useI18n'
import { 
  Lightbulb,
  FileText,
  Folder,
  Mail,
  AlignLeft,
  Upload,
  Send,
  List,
  Gamepad2,
  Castle,
  Car,
  Clock,
  CheckCircle,
  XCircle,
  X,
  File,
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react'

/**
 * Project Incubation Page
 * Proposal submission system for project ideas
 */

// Icon mapping for proposals
const proposalIcons = [Gamepad2, Castle, Car, Sparkles]

// Status badge component
interface StatusBadgeProps {
  status: string
  labels: {
    reviewing: string
    approved: string
    rejected: string
  }
}

function StatusBadge({ status, labels }: StatusBadgeProps) {
  const config = {
    reviewing: {
      bg: 'bg-[var(--warning-subtle)]',
      text: 'text-[var(--warning-text)]',
      icon: Clock,
      label: labels.reviewing
    },
    approved: {
      bg: 'bg-[var(--success-subtle)]',
      text: 'text-[var(--success-text)]',
      icon: CheckCircle,
      label: labels.approved
    },
    rejected: {
      bg: 'bg-[var(--error-subtle)]',
      text: 'text-[var(--error-text)]',
      icon: XCircle,
      label: labels.rejected
    }
  }[status] || { bg: 'bg-[var(--bg-overlay)]', text: 'text-[var(--text-secondary)]', icon: Clock, label: status }

  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

// Proposal data type
interface Proposal {
  id: number
  name: string
  status: string
  date: string
  description: string
  email?: string
  fileName?: string
}

// Proposal card component with expand/collapse
interface ProposalCardProps {
  proposal: Proposal
  labels: {
    submitted: string
    status: {
      reviewing: string
      approved: string
      rejected: string
    }
  }
  iconIndex: number
  isNew?: boolean
}

function ProposalCard({ proposal, labels, iconIndex, isNew = false }: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(isNew)
  const Icon = proposalIcons[iconIndex % proposalIcons.length]

  return (
    <div className={`bg-gray-800/30 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 ${isNew ? 'border-blue-500/50 animate-scale-in' : 'border-gray-700/50'} hover:border-blue-500/30`}>
      {/* Clickable Header */}
      <div onClick={() => setIsExpanded(!isExpanded)} className="p-4 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${isNew ? 'bg-[var(--primary-subtle)]' : 'bg-[var(--bg-overlay)]'}`}>
            <Icon className={`w-5 h-5 ${isNew ? 'text-[var(--primary-text)]' : 'text-[var(--text-secondary)]'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
                {proposal.name}
                {isNew && <span className="ml-2 text-xs text-[var(--primary-text)]">NEW</span>}
              </h4>
              <div className="flex items-center gap-2">
                <StatusBadge status={proposal.status} labels={labels.status} />
                {isExpanded ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
              </div>
            </div>
            <p className={`text-xs text-[var(--text-muted)] ${isExpanded ? '' : 'line-clamp-1'}`}>
              {proposal.description}
            </p>
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-[var(--border-muted)] animate-fade-in">
          <div className="pt-3 space-y-2">
            <div>
              <span className="text-xs text-[var(--text-muted)]">Description:</span>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{proposal.description}</p>
            </div>
            {proposal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-secondary)]">{proposal.email}</span>
              </div>
            )}
            {proposal.fileName && (
              <div className="flex items-center gap-2">
                <File className="w-3 h-3 text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-secondary)]">{proposal.fileName}</span>
              </div>
            )}
            <div className="flex items-center gap-2 pt-2">
              <Clock className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">{labels.submitted}: {proposal.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Incubation() {
  const { t, loading } = useI18n()
  const { toasts, toast, removeToast } = useToast()
  
  // Form state
  const [formData, setFormData] = useState({
    projectName: '',
    email: '',
    description: ''
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Dynamic proposals list
  const [userProposals, setUserProposals] = useState<Proposal[]>([])
  const [newProposalId, setNewProposalId] = useState<number | null>(null)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Loading state
  if (loading || !t) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  const { incubation } = t

  // Initial mock proposals
  const initialProposals: Proposal[] = [
    { id: 1, name: incubation.mockData.name1, status: 'reviewing', date: '2024-01-05', description: incubation.mockData.desc1 },
    { id: 2, name: incubation.mockData.name2, status: 'approved', date: '2024-01-02', description: incubation.mockData.desc2 },
    { id: 3, name: incubation.mockData.name3, status: 'rejected', date: '2023-12-28', description: incubation.mockData.desc3 },
  ]
  
  // Combine user proposals with initial mock data
  const allProposals = [...userProposals, ...initialProposals]
  
  // Calculate status counts
  const statusCounts = allProposals.reduce(
    (acc, p) => {
      if (p.status === 'reviewing') acc.reviewing++
      else if (p.status === 'approved') acc.approved++
      else if (p.status === 'rejected') acc.rejected++
      return acc
    },
    { reviewing: 0, approved: 0, rejected: 0 }
  )

  // Handle file upload
  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
    
    if (allowedTypes.includes(file.type)) {
      setUploadedFile(file)
    } else {
      toast.error(incubation.validation.invalidFileType)
    }
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle form submission with Toast feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.projectName.trim()) {
      toast.error(incubation.validation.projectNameRequired)
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error(incubation.validation.emailRequired)
      return
    }
    if (!formData.description.trim()) {
      toast.error(incubation.validation.descriptionRequired)
      return
    }
    
    // Start submission
    setIsSubmitting(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Create new proposal
    const newId = Date.now()
    const newProposal: Proposal = {
      id: newId,
      name: formData.projectName,
      status: 'reviewing',
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      email: formData.email,
      fileName: uploadedFile?.name
    }
    
    // Add to proposals list (at the beginning)
    setUserProposals(prev => [newProposal, ...prev])
    setNewProposalId(newId)
    
    // Clear the "new" indicator after 5 seconds
    setTimeout(() => setNewProposalId(null), 5000)
    
    // Show success toast
    toast.success(incubation.validation.submitSuccess)
    
    // Reset form
    setFormData({ projectName: '', email: '', description: '' })
    setUploadedFile(null)
    setIsSubmitting(false)
  }

  return (
    <MainLayout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
          {/* Page Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  {incubation.title}
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  {incubation.subtitle}
                </p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] max-w-3xl">
              {incubation.description}
            </p>
          </header>

          {/* Main Content: Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Submission Form */}
            <section className="lg:col-span-3">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-[var(--primary-text)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    {incubation.form.title}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Project Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                      <Folder className="w-4 h-4 text-[var(--text-secondary)]" />
                      {incubation.form.projectName}
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      placeholder={incubation.form.projectNamePlaceholder}
                      className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-default)] rounded text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-border)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                      <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                      {incubation.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={incubation.form.emailPlaceholder}
                      className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-default)] rounded text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-border)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                      <AlignLeft className="w-4 h-4 text-[var(--text-secondary)]" />
                      {incubation.form.descriptionLabel}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={incubation.form.descriptionPlaceholder}
                      rows={5}
                      className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-default)] rounded text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-border)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                      <Upload className="w-4 h-4 text-[var(--text-secondary)]" />
                      {incubation.form.document}
                    </label>
                    
                    {uploadedFile ? (
                      <div className="flex items-center gap-3 p-4 bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded">
                        <File className="w-8 h-8 text-[var(--primary-text)]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-[var(--bg-hover)] rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-[var(--text-secondary)]" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                          flex flex-col items-center justify-center p-8 border-2 border-dashed rounded cursor-pointer transition-colors
                          ${isDragging 
                            ? 'border-[var(--primary-border)] bg-[var(--primary-subtle)]' 
                            : 'border-[var(--border-muted)] hover:border-[var(--border-emphasis)] hover:bg-[var(--bg-overlay)]'
                          }
                        `}
                      >
                        <Upload className="w-10 h-10 text-[var(--text-muted)] mb-3" />
                        <p className="text-sm text-[var(--text-secondary)] mb-1">
                          {incubation.form.dragDropText}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {incubation.form.supportedFormats}
                        </p>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {incubation.form.submitButton}
                  </button>
                </form>
              </div>
            </section>

            {/* Right: Proposals List */}
            <aside className="lg:col-span-2">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <List className="w-5 h-5 text-[var(--primary-text)]" />
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    {incubation.proposals.title}
                  </h2>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {allProposals.map((proposal, index) => (
                    <ProposalCard 
                      key={proposal.id} 
                      proposal={proposal} 
                      labels={incubation.proposals}
                      iconIndex={index}
                      isNew={proposal.id === newProposalId}
                    />
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-6 border-t border-[var(--border-default)]">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-[var(--warning-text)]">{statusCounts.reviewing}</div>
                      <div className="text-xs text-[var(--text-muted)]">{incubation.proposals.status.reviewing}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-[var(--success-text)]">{statusCounts.approved}</div>
                      <div className="text-xs text-[var(--text-muted)]">{incubation.proposals.status.approved}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-[var(--error-text)]">{statusCounts.rejected}</div>
                      <div className="text-xs text-[var(--text-muted)]">{incubation.proposals.status.rejected}</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
    </MainLayout>
  )
}

export default Incubation