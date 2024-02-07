import { useGetFeatureFlagQuery } from '../features/FeatureFlagApi'
import { createContext, ReactNode } from 'react'
import { useMemo } from 'react'
import React from 'react'

interface ContextProps {
  isTelegramShareEnabled: boolean
}

interface ProviderProps {
  children: ReactNode
}

export const FeatureFlagContext = createContext<ContextProps>({
  isTelegramShareEnabled: false,
})

export const FeatureFlagProvider: React.FC<ProviderProps> = ({ children }) => {
  const { data } = useGetFeatureFlagQuery()

  const value = useMemo(() => {
    if (data) {
      return data
    }
    return { isTelegramShareEnabled: false }
  }, [data])

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  )
}
