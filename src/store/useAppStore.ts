import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, ModuleProgress } from '../types'

interface AppState {
  user: UserProfile | null
  progress: Record<string, ModuleProgress>
  setUser: (user: UserProfile | null) => void
  setModuleCompleted: (moduleId: string) => void
  setQuizResult: (moduleId: string, score: number, passed: boolean) => void
  getModuleProgress: (moduleId: string) => ModuleProgress | null
  isModuleUnlocked: (moduleOrder: number) => boolean
  reset: () => void
}

const defaultProgress = (): ModuleProgress => ({
  moduleId: '',
  completed: false,
  quizPassed: false,
  quizScore: 0,
})

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      progress: {},

      setUser: (user) => set({ user }),

      setModuleCompleted: (moduleId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [moduleId]: {
              ...defaultProgress(),
              ...state.progress[moduleId],
              moduleId,
              completed: true,
            },
          },
        })),

      setQuizResult: (moduleId, score, passed) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [moduleId]: {
              ...defaultProgress(),
              ...state.progress[moduleId],
              moduleId,
              quizScore: score,
              quizPassed: passed,
            },
          },
        })),

      getModuleProgress: (moduleId) => get().progress[moduleId] ?? null,

      isModuleUnlocked: (moduleOrder) => {
        if (moduleOrder === 1) return true
        const { progress } = get()
        // Unlock if previous module quiz passed
        const prevModuleId = `module-${moduleOrder - 1}`
        const prev = progress[prevModuleId]
        return prev?.quizPassed === true
      },

      reset: () => set({ user: null, progress: {} }),
    }),
    { name: 'eabr-app-store' }
  )
)
