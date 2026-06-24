import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import DashboardClient from './client'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch user profile (role) from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, nome')
    .eq('id', user.id)
    .single()

  return (
    <DashboardClient
      user={{
        id: user.id,
        email: user.email ?? '',
        nome: profile?.nome ?? user.email ?? '',
        role: profile?.role ?? 'viewer',
      }}
    />
  )
}
