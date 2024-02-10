import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { messages } from './messages'
import { api } from '../redux/api'

interface ParsedCommand {
  command: string
  params: string[] | undefined
}

export const parseCommand = (commandSting: string): ParsedCommand => {
  const command = commandSting.match(/\/([^ ]*)/g)
  const params = commandSting.match(/\[([^\]]+)]/g)
  const parsedParams = params?.map((p) => p.slice(1, -1).trim())
  return { command: String(command), params: parsedParams }
}

/* eslint-disable no-console */
export const searchProducts = (
  params: string,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
): void => {
  const query = params[0]
  if (params) {
    dispatch(api.endpoints.searchProducts.initiate(query))
      .unwrap()
      .then((res) => console.table(res))
      .catch((e) => console.warn(e))
  } else {
    console.warn(messages.searchWarning)
  }
}

export const getProduct = (
  params: string[],
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
) => {
  const id = Number(params[0])
  dispatch(api.endpoints.getDetailProduct.initiate(id))
    .unwrap()
    .then((res) => console.dir(res))
    .catch((e) => console.warn(e))
}

export const showStart = () => {
  console.log(messages.welcome)
}

export const showHelp = () => {
  console.log(messages.help)
}

export const showNotFound = () => {
  console.warn(messages.notFound)
}
/* eslint-enable no-console */
