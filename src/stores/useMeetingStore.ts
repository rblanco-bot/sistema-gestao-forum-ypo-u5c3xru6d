import React, { createContext, useContext, useState } from 'react'

type UpdateData = {
  depth: string
  keyword: string
}

type MemberUpdates = {
  Pessoal: UpdateData
  Familiar: UpdateData
  Profissional: UpdateData
}

type SelectionData = {
  memberId: string
  category: string
  keyword: string
  urgency: string
}

type PresentationData = {
  memberId: string
  modality: string
  cleared: boolean
}

type MeetingContextType = {
  attendance: Record<string, string>
  setAttendance: React.Dispatch<React.SetStateAction<Record<string, string>>>
  roles: Record<string, string>
  setRoles: React.Dispatch<React.SetStateAction<Record<string, string>>>
  updates: Record<string, MemberUpdates>
  setUpdates: React.Dispatch<React.SetStateAction<Record<string, MemberUpdates>>>
  selections: SelectionData[]
  setSelections: React.Dispatch<React.SetStateAction<SelectionData[]>>
  presentations: PresentationData[]
  setPresentations: React.Dispatch<React.SetStateAction<PresentationData[]>>
  resetMeeting: () => void
}

const MeetingContext = createContext<MeetingContextType | null>(null)

export const MeetingProvider = ({ children }: { children: React.ReactNode }) => {
  const [attendance, setAttendance] = useState<Record<string, string>>({})
  const [roles, setRoles] = useState<Record<string, string>>({})
  const [updates, setUpdates] = useState<Record<string, MemberUpdates>>({})
  const [selections, setSelections] = useState<SelectionData[]>([])
  const [presentations, setPresentations] = useState<PresentationData[]>([])

  const resetMeeting = () => {
    setAttendance({})
    setRoles({})
    setUpdates({})
    setSelections([])
    setPresentations([])
  }

  return React.createElement(
    MeetingContext.Provider,
    {
      value: {
        attendance,
        setAttendance,
        roles,
        setRoles,
        updates,
        setUpdates,
        selections,
        setSelections,
        presentations,
        setPresentations,
        resetMeeting,
      },
    },
    children,
  )
}

export default function useMeetingStore() {
  const context = useContext(MeetingContext)
  if (!context) throw new Error('useMeetingStore must be used within MeetingProvider')
  return context
}
