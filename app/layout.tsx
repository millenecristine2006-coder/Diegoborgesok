import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diego Borges — Gestão de Eventos',
  description: 'Sistema de gestão de eventos e agenda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
