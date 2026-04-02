import React, { createContext, useContext, useState, useEffect } from 'react'
import { MEMBERS } from '@/lib/mock'

export type MeetingSnapshot = {
  id: string
  date: string
  location: string
  moderator: string
  startTime: string
  endTime: string
  attendance: Record<string, string>
  roles: Record<string, string>
  presentations: { memberId: string; modality: string }[]
  processorFeedback: string
}

type HistoryContextType = {
  history: MeetingSnapshot[]
  addSnapshot: (snapshot: MeetingSnapshot) => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

const MOCK_HISTORY: MeetingSnapshot[] = [
  {
    id: 'mock-past-1',
    date: '2024-02-15',
    location: 'Sede YPO',
    moderator: 'João Silva',
    startTime: '08:00',
    endTime: '12:00',
    attendance: {
      [MEMBERS[0]?.id || '1']: 'presente',
      [MEMBERS[1]?.id || '2']: 'ausente',
    },
    roles: {
      [MEMBERS[0]?.id || '1']: 'Moderador',
      [MEMBERS[1]?.id || '2']: 'Apresentador',
    },
    presentations: [{ memberId: MEMBERS[1]?.id || '2', modality: 'Deep Dive' }],
    processorFeedback: 'Reunião muito produtiva no primeiro trimestre.',
  },
  {
    id: 'mock-past-2',
    date: '2024-05-20',
    location: 'Escritório Central',
    moderator: 'Maria Oliveira',
    startTime: '14:00',
    endTime: '18:00',
    attendance: {
      [MEMBERS[0]?.id || '1']: 'presente',
      [MEMBERS[1]?.id || '2']: 'presente',
    },
    roles: {
      [MEMBERS[0]?.id || '1']: 'Apresentador',
      [MEMBERS[1]?.id || '2']: 'Moderador',
    },
    presentations: [{ memberId: MEMBERS[0]?.id || '1', modality: 'Atualização Pessoal' }],
    processorFeedback: 'Excelentes discussões e engajamento.',
  },
  {
    id: 'mock-past-3',
    date: '2024-08-10',
    location: 'Hotel Transamérica',
    moderator: 'Carlos Mendes',
    startTime: '09:00',
    endTime: '13:00',
    attendance: {
      [MEMBERS[0]?.id || '1']: 'ausente',
      [MEMBERS[1]?.id || '2']: 'presente',
    },
    roles: {
      [MEMBERS[0]?.id || '1']: 'Observador',
      [MEMBERS[1]?.id || '2']: 'Apresentador',
    },
    presentations: [],
    processorFeedback: 'A pauta foi um pouco longa, mas conseguimos cobrir o principal.',
  },
  {
    id: 'mock-past-4',
    date: '2024-11-05',
    location: 'Sede YPO',
    moderator: 'Ana Costa',
    startTime: '10:00',
    endTime: '14:00',
    attendance: {
      [MEMBERS[0]?.id || '1']: 'presente',
      [MEMBERS[1]?.id || '2']: 'presente',
    },
    roles: {
      [MEMBERS[0]?.id || '1']: 'Moderador',
      [MEMBERS[1]?.id || '2']: 'Apresentador',
    },
    presentations: [{ memberId: MEMBERS[1]?.id || '2', modality: 'Deep Dive' }],
    processorFeedback: 'Fechamento de ano com ótimos resultados.',
  },
]

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<MeetingSnapshot[]>(() => {
    try {
      const stored = localStorage.getItem('ypo_meeting_history')
      return stored ? JSON.parse(stored) : MOCK_HISTORY
    } catch {
      return MOCK_HISTORY
    }
  })

  useEffect(() => {
    localStorage.setItem('ypo_meeting_history', JSON.stringify(history))
  }, [history])

  const addSnapshot = (snapshot: MeetingSnapshot) => {
    setHistory((prev) => [snapshot, ...prev])
  }

  return React.createElement(HistoryContext.Provider, { value: { history, addSnapshot } }, children)
}

export default function useHistoryStore() {
  const context = useContext(HistoryContext)
  if (!context) throw new Error('useHistoryStore must be used within HistoryProvider')
  return context
}
