import { useGetFeatureFlagQuery } from '../shared/FeatureFlagApi'
import { createContext } from 'react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import React from 'react'

export const FeatureFlagContext = createContext({
  isTelegramShareEnabled: false,
})

export const FeatureFlagProvider = ({ children }) => {
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

FeatureFlagProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
