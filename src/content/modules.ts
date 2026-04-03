import type { ModuleContent } from '../types'
import module1 from './module-1'
import module2 from './module-2'
import module3 from './module-3'
import module4 from './module-4'
import module5 from './module-5'
import module6 from './module-6'
import module7 from './module-7'
import module8 from './module-8'
import module9 from './module-9'
import module10 from './module-10'

// Список всех модулей (метаданные для Dashboard и карты)
export const MODULES_META = [
  { id: 'module-1', order: 1, title: 'Администратор', subtitle: 'Первая точка контакта с пациентом', icon: 'UserCircle', color: '#1A2B4A' },
  { id: 'module-2', order: 2, title: 'Куратор', subtitle: 'Проводник пациента по клинике', icon: 'GraduationCap', color: '#1A2B4A' },
  { id: 'module-3', order: 3, title: 'Колл-центр', subtitle: 'Голос клиники', icon: 'Phone', color: '#1A2B4A' },
  { id: 'module-4', order: 4, title: 'Маркетолог', subtitle: 'Привлечение и аналитика', icon: 'ChartBar', color: '#1A2B4A' },
  { id: 'module-5', order: 5, title: 'PR-менеджер', subtitle: 'Репутация и публикации', icon: 'Newspaper', color: '#1A2B4A' },
  { id: 'module-6', order: 6, title: 'SMM-менеджер', subtitle: 'Социальные сети и контент', icon: 'InstagramLogo', color: '#1A2B4A' },
  { id: 'module-7', order: 7, title: 'HR-менеджер', subtitle: 'Команда и найм', icon: 'Users', color: '#1A2B4A' },
  { id: 'module-8', order: 8, title: 'Бухгалтер', subtitle: 'Финансы и документы', icon: 'Calculator', color: '#1A2B4A' },
  { id: 'module-9', order: 9, title: 'Управляющий / CEO', subtitle: 'Стратегия и контроль', icon: 'Crown', color: '#1A2B4A' },
  { id: 'module-10', order: 10, title: 'Команда как система', subtitle: 'Как роли работают вместе', icon: 'UsersThree', color: '#2E7D32' },
]

const MODULE_MAP: Record<string, ModuleContent> = {
  'module-1': module1,
  'module-2': module2,
  'module-3': module3,
  'module-4': module4,
  'module-5': module5,
  'module-6': module6,
  'module-7': module7,
  'module-8': module8,
  'module-9': module9,
  'module-10': module10,
}

export const getModuleById = async (id: string): Promise<ModuleContent | null> => {
  return MODULE_MAP[id] ?? null
}
