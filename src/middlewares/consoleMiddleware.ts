import {
  searchProducts,
  getProduct,
  showHelp,
  showStart,
  showNotFound,
} from '../consoleAPI/consoleFunctions'
import {
  createListenerMiddleware,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit'
import { consoleParamsSet } from '../consoleAPI/consoleAction'
import { commands } from '../consoleAPI/commands'

export const consoleListenerMiddleware = createListenerMiddleware()

consoleListenerMiddleware.startListening({
  actionCreator: consoleParamsSet,
  effect: async (action, listenerApi) => {
    const { command, params } = action.payload
    const dispatch: ThunkDispatch<unknown, unknown, UnknownAction> =
      listenerApi.dispatch
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
