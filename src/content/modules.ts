import type { ModuleContent } from '../types'

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

// Контент будет добавлен в отдельных файлах
export const getModuleById = async (id: string): Promise<ModuleContent | null> => {
  try {
    const mod = await import(`./${id}.ts`)
    return mod.default as ModuleContent
  } catch {
    return null
  }
}
