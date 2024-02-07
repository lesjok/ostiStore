import { consoleParamsSet } from './consoleAction'
import { parseCommand } from './consoleFunctions'
import { AppDispatch } from '../redux/store'

export const show = (dispatch: AppDispatch) => (commandString: string) => {
  const { command, params } = parseCommand(commandString)
  if (command) {
    dispatch(consoleParamsSet(command, params))
  }
}
