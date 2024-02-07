import { createAction } from '@reduxjs/toolkit'

export const consoleParamsSet = createAction(
  'consoleParamsSet',
  (command, params) => ({
    payload: {
      command,
      params,
    },
  }),
)
