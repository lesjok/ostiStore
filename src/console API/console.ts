import { consoleParamsSet } from './consoleAction'
import { parseCommand } from './consoleFunctions'
import { Dispatch } from 'redux'

export const show = (dispatch: Dispatch) => (commandString: string) => {
  const { command, params } = parseCommand(commandString)
  if (command) {
    dispatch(consoleParamsSet(command, params))
  }
}
