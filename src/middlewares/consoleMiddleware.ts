import {
  searchProducts,
  getProduct,
  showHelp,
  showStart,
  showNotFound,
} from '../consoleAPI/consoleFunctions'
import { consoleParamsSet } from '../consoleAPI/consoleAction'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { commands } from '../consoleAPI/commands'
import { AppDispatch } from '../redux/store'

export const consoleListenerMiddleware = createListenerMiddleware()
const startAppListening = consoleListenerMiddleware.startListening

startAppListening({
  actionCreator: consoleParamsSet,
  effect: async (action, listenerApi) => {
    const { command, params } = action.payload
    const { dispatch } = listenerApi as { dispatch: AppDispatch } //к сожалению не знаю как тут обойтись без as
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
