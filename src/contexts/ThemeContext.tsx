import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react'

interface contextProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

interface providerProps {
  children: ReactNode
}

const ThemeContext = createContext<contextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: providerProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const contextValue = useMemo(() => {
    return {
      darkMode,
      toggleDarkMode,
    }
  }, [darkMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
