import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: 'student' | 'admin'
          contract_signed_at: string | null
          contract_ip: string | null
          contract_number: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      module_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          completed_at: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          module_id: string
          score: number
          passed: boolean
          attempt_number: number
          created_at: string
        }
      }
    }
  }
}
