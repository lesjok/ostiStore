import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setCurrentUser } from '../redux/slice'

interface IAction {
  payload?: {
    email: string | null
    uid: string | null
  }
}

export const authMiddleware = createListenerMiddleware()

authMiddleware.startListening({
  actionCreator: setCurrentUser,
  effect: async (action: IAction) => {
    /* eslint-disable no-console*/
    console.log('Пользователь: ' + action.payload?.email + ' вошёл в аккаунт')
  },
})
