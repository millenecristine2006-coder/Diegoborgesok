'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C1C36',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '36px 40px',
        width: 'min(400px, 100%)',
        boxShadow: '0 24px 64px rgba(0,0,0,.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px', height: '52px', background: '#2563EB',
            borderRadius: '14px', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', color: '#fff', marginBottom: '12px',
          }}>★</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#0C1C36' }}>Diego Borges</div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Gestão de Eventos</div>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FCA5A5',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#991B1B', marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              style={{
                width: '100%', padding: '10px 13px',
                border: '1px solid #D1D5DB', borderRadius: '8px',
                fontSize: '14px', outline: 'none', fontFamily: 'inherit',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{
                width: '100%', padding: '10px 13px',
                border: '1px solid #D1D5DB', borderRadius: '8px',
                fontSize: '14px', outline: 'none', fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: loading ? '#93C5FD' : '#2563EB',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '6px', transition: 'background .12s',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
