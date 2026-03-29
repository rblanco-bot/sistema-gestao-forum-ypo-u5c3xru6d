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

type MeetingDetails = {
  date: string
  location: string
  startTime: string
  endTime: string
}

type MeetingContextType = {
  meetingDetails: MeetingDetails
  setMeetingDetails: React.Dispatch<React.SetStateAction<MeetingDetails>>
  attendance: Record<string, string>
  setAttendance: React.Dispatch<React.SetStateAction<Record<string, string>>>
  attendanceTimes: Record<string, string>
  setAttendanceTimes: React.Dispatch<React.SetStateAction<Record<string, string>>>
  roles: Record<string, string>
  setRoles: React.Dispatch<React.SetStateAction<Record<string, string>>>
  updates: Record<string, MemberUpdates>
  setUpdates: React.Dispatch<React.SetStateAction<Record<string, MemberUpdates>>>
  selections: SelectionData[]
  setSelections: React.Dispatch<React.SetStateAction<SelectionData[]>>
  presentations: PresentationData[]
  setPresentations: React.Dispatch<React.SetStateAction<PresentationData[]>>
  usedIcebreakers: string[]
  setUsedIcebreakers: React.Dispatch<React.SetStateAction<string[]>>
  processorFeedback: string
  setProcessorFeedback: React.Dispatch<React.SetStateAction<string>>
  resetMeeting: () => void
}

const MeetingContext = createContext<MeetingContextType | null>(null)

export const MeetingProvider = ({ children }: { children: React.ReactNode }) => {
  const init = (key: string, def: any) => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : def
    } catch {
      return def
    }
  }

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>(() =>
    init('ypo_meeting_details', {
      date: new Date().toISOString().split('T')[0],
      location: '',
      startTime: '',
      endTime: '',
    }),
  )
  const [attendance, setAttendance] = useState<Record<string, string>>(() =>
    init('ypo_attendance', {}),
  )
  const [attendanceTimes, setAttendanceTimes] = useState<Record<string, string>>(() =>
    init('ypo_attendance_times', {}),
  )
  const [roles, setRoles] = useState<Record<string, string>>(() => init('ypo_roles', {}))
  const [updates, setUpdates] = useState<Record<string, MemberUpdates>>(() =>
    init('ypo_updates', {}),
  )
  const [selections, setSelections] = useState<SelectionData[]>(() => init('ypo_selections', []))
  const [presentations, setPresentations] = useState<PresentationData[]>(() =>
    init('ypo_presentations', []),
  )
  const [usedIcebreakers, setUsedIcebreakers] = useState<string[]>(() =>
    init('ypo_used_icebreakers', []),
  )
  const [processorFeedback, setProcessorFeedback] = useState<string>(() =>
    init('ypo_processor_feedback', ''),
  )

  React.useEffect(() => {
    localStorage.setItem('ypo_meeting_details', JSON.stringify(meetingDetails))
  }, [meetingDetails])
  React.useEffect(() => {
    localStorage.setItem('ypo_attendance', JSON.stringify(attendance))
  }, [attendance])
  React.useEffect(() => {
    localStorage.setItem('ypo_attendance_times', JSON.stringify(attendanceTimes))
  }, [attendanceTimes])
  React.useEffect(() => {
    localStorage.setItem('ypo_roles', JSON.stringify(roles))
  }, [roles])
  React.useEffect(() => {
    localStorage.setItem('ypo_updates', JSON.stringify(updates))
  }, [updates])
  React.useEffect(() => {
    localStorage.setItem('ypo_selections', JSON.stringify(selections))
  }, [selections])
  React.useEffect(() => {
    localStorage.setItem('ypo_presentations', JSON.stringify(presentations))
  }, [presentations])
  React.useEffect(() => {
    localStorage.setItem('ypo_used_icebreakers', JSON.stringify(usedIcebreakers))
  }, [usedIcebreakers])
  React.useEffect(() => {
    localStorage.setItem('ypo_processor_feedback', JSON.stringify(processorFeedback))
  }, [processorFeedback])

  const resetMeeting = () => {
    setMeetingDetails({
      date: new Date().toISOString().split('T')[0],
      location: '',
      startTime: '',
      endTime: '',
    })
    setAttendance({})
    setAttendanceTimes({})
    setRoles({})
    setUpdates({})
    setSelections([])
    setPresentations([])
    setProcessorFeedback('')
    localStorage.removeItem('ypo_meeting_details')
    localStorage.removeItem('ypo_attendance')
    localStorage.removeItem('ypo_attendance_times')
    localStorage.removeItem('ypo_roles')
    localStorage.removeItem('ypo_updates')
    localStorage.removeItem('ypo_selections')
    localStorage.removeItem('ypo_presentations')
    localStorage.removeItem('ypo_processor_feedback')
  }

  return React.createElement(
    MeetingContext.Provider,
    {
      value: {
        meetingDetails,
        setMeetingDetails,
        attendance,
        setAttendance,
        attendanceTimes,
        setAttendanceTimes,
        roles,
        setRoles,
        updates,
        setUpdates,
        selections,
        setSelections,
        presentations,
        setPresentations,
        usedIcebreakers,
        setUsedIcebreakers,
        processorFeedback,
        setProcessorFeedback,
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
