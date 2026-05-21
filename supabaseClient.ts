
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pjyqyodxhfvevbfuiyzq.supabase.co'
const supabaseKey = 'sb_publishable_T6_9n6u0vtb-h4spj2C_pA_lCc7bU6F'

if (!supabaseKey || (supabaseKey as string) === 'PLACEHOLDER') {
  console.warn('Supabase API key is missing or invalid. Please check your configuration.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
