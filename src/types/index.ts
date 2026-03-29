export interface UserProfile {
  id: string
  full_name: string
  role: 'student' | 'admin'
  contract_signed_at: string | null
  contract_ip: string | null
  contract_number: number | null
  created_at: string
}

export interface ModuleContent {
  id: string
  order: number
  title: string
  subtitle: string
  icon: string
  readTime: number
  sections: Section[]
  quiz: QuizQuestion[]
}

export type Section =
  | RoleCardSection
  | ExpandableSection
  | ComparisonSection
  | WarningSection
  | LegalSection
  | ScenarioSection
  | StepFlowSection
  | KeyInsightSection
  | TextSection

export interface RoleCardSection {
  id: string
  type: 'role-card'
  content: { description: string; keyPhrase: string }
}

export interface ExpandableSection {
  id: string
  type: 'expandable'
  title: string
  items: string[]
}

export interface ComparisonSection {
  id: string
  type: 'comparison'
  included: string[]
  excluded: string[]
}

export interface WarningSection {
  id: string
  type: 'warning'
  content: string
}

export interface LegalSection {
  id: string
  type: 'legal'
  law: string
  content: string
}

export interface ScenarioSection {
  id: string
  type: 'scenario'
  situation: string
  options: ScenarioOption[]
}

export interface ScenarioOption {
  id: string
  text: string
  isCorrect: boolean
  feedback: string
}

export interface StepFlowSection {
  id: string
  type: 'step-flow'
  title: string
  steps: string[]
}

export interface KeyInsightSection {
  id: string
  type: 'key-insight'
  content: string
}

export interface TextSection {
  id: string
  type: 'text'
  content: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface ModuleProgress {
  moduleId: string
  completed: boolean
  quizPassed: boolean
  quizScore: number
}
