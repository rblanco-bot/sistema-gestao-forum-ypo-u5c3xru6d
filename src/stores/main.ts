import React, { createContext, useContext, useState } from 'react'
import { MEMBERS } from '@/lib/mock'

type MainContextType = {
  currentUser: (typeof MEMBERS)[0]
  setCurrentUser: (user: (typeof MEMBERS)[0]) => void
}

const MainContext = createContext<MainContextType | null>(null)

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(MEMBERS[0])

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
