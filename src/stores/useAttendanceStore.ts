import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { MEMBERS } from '@/lib/mock'

export type AttendanceRecord = {
  meetingId: string
  meetingDate: string
  memberId: string
  status: string
  delayMinutes: number
}

type AttendanceContextType = {
  records: AttendanceRecord[]
  addMeetingRecords: (records: AttendanceRecord[]) => void
}

const AttendanceContext = createContext<AttendanceContextType | null>(null)

const currentYear = new Date().getFullYear()
const MOCK_RECORDS: AttendanceRecord[] = [
  {
    meetingId: 'mock-1',
    meetingDate: `${currentYear}-01-15`,
    memberId: MEMBERS[1]?.id || MEMBERS[0]?.id,
    status: 'atrasado',
    delayMinutes: 10,
  },
  {
    meetingId: 'mock-2',
    meetingDate: `${currentYear}-02-15`,
    memberId: MEMBERS[2]?.id || MEMBERS[0]?.id,
    status: 'ausente',
    delayMinutes: 0,
  },
  {
    meetingId: 'mock-3',
    meetingDate: `${currentYear}-03-15`,
    memberId: MEMBERS[2]?.id || MEMBERS[0]?.id,
    status: 'ausente',
    delayMinutes: 0,
  },
  {
    meetingId: 'mock-4',
    meetingDate: `${currentYear}-04-15`,
    memberId: MEMBERS[2]?.id || MEMBERS[0]?.id,
    status: 'atrasado',
    delayMinutes: 20,
  },
]

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const stored = localStorage.getItem('ypo_attendance_history')
      return stored ? JSON.parse(stored) : MOCK_RECORDS
    } catch {
      return MOCK_RECORDS
    }
  })

  useEffect(() => {
    localStorage.setItem('ypo_attendance_history', JSON.stringify(records))
  }, [records])

  const addMeetingRecords = useCallback((newRecords: AttendanceRecord[]) => {
    setRecords((prev) => {
      const meetingId = newRecords[0]?.meetingId
      if (!meetingId) return prev
      const filtered = prev.filter((r) => r.meetingId !== meetingId)
      return [...filtered, ...newRecords]
    })
  }, [])

  return React.createElement(
    AttendanceContext.Provider,
    { value: { records, addMeetingRecords } },
    children,
  )
}

export default function useAttendanceStore() {
  const context = useContext(AttendanceContext)
  if (!context) throw new Error('useAttendanceStore must be used within AttendanceProvider')
  return context
}
