import React, { createContext, useContext, useState } from 'react'
import { MEMBERS } from '@/lib/mock'

type MainContextType = {
  currentUser: (typeof MEMBERS)[0]
  setCurrentUser: (user: (typeof MEMBERS)[0]) => void
}

const MainContext = createContext<MainContextType | null>(null)

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ypo_user')
      return stored ? JSON.parse(stored) : MEMBERS[0]
    } catch {
      return MEMBERS[0]
    }
  })

  React.useEffect(() => {
    localStorage.setItem('ypo_user', JSON.stringify(currentUser))
  }, [currentUser])

  return React.createElement(
    MainContext.Provider,
    { value: { currentUser, setCurrentUser } },
    children,
  )
}

export default function useMainStore() {
  const context = useContext(MainContext)
  if (!context) throw new Error('useMainStore must be used within MainProvider')
  return context
}
