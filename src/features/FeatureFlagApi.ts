import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface FeatureFlag {
  isTelegramShareEnabled: boolean
}

export const featureFlagApi = createApi({
  reducerPath: 'featureFlagApi',
  baseQuery: fetchBaseQuery({
    method: 'GET',
    baseUrl: process.env.REACT_APP_FEATURE_FLAG_SERVER_URL,
  }),
  endpoints: (builder) => ({
    getFeatureFlag: builder.query<FeatureFlag, void>({
      query: () => 'api/feature-flag',
    }),
  }),
})

export const { useGetFeatureFlagQuery } = featureFlagApi
