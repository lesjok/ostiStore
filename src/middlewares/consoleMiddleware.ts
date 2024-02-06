import {
  searchProducts,
  getProduct,
  showHelp,
  showStart,
  showNotFound,
} from '../console API/consoleFunctions'
import { consoleParamsSet } from '../console API/consoleAction'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { commands } from '../console API/commands'
import { AppDispatch } from '../redux/store'

export const consoleListenerMiddleware = createListenerMiddleware()
const startAppListening = consoleListenerMiddleware.startListening

startAppListening({
  actionCreator: consoleParamsSet,
  effect: async (action, listenerApi) => {
    const { command, params } = action.payload
    const { dispatch } = listenerApi as { dispatch: AppDispatch }
    switch (command) {
      case commands.init:
        showStart()
        break
      case commands.help:
        showHelp()
        break
      case commands.search:
        searchProducts(params, dispatch)
        break
      case commands.getProduct:
        getProduct(params, dispatch)
        break
      default:
        showNotFound()
    }
  },
})
