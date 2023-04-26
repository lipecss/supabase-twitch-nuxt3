import { createClient } from '@supabase/supabase-js'

const plugin = (context) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    }
  )

  context.$supabase = supabase
}

export default defineNuxtPlugin(plugin)
