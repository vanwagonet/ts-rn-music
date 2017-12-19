import { Dispatch, MiddlewareAPI } from 'redux'

const ISO_DATE = /^\d{4,}-\d{2}-\d{2}T\d{2}(:\d{2}:\d{2}(\.\d+)?([-+]\d{2}:\d{2})?Z?)?$/
export const reviver: any = (key: any, value: any) => {
  if (typeof value === 'string' && ISO_DATE.test(value)) {
    return new Date(value)
  }
  return value
}

export enum Status {
  Unsent = 'UNSENT',
  Loading = 'LOADING',
  Done = 'DONE',
  Error = 'ERROR'
}

export interface Request<Response> {
  error?: Error
  options?: RequestInit
  status: Status
  response?: Response
  url: string
}

export const request = <Response>(url: string, options?: RequestInit): Request<Response> => ({
  options,
  status: Status.Unsent,
  url
})

export default <S>(store: MiddlewareAPI<S>) => (next: Dispatch<S>) => (action: any) => {
  if (!action.request || action.request.status !== Status.Unsent) {
    return next(action)
  }

  next({
    ...action,
    request: {
      ...action.request,
      status: Status.Loading
    }
  })

  return fetch(action.request.url, action.request.options)
    .then((response) => response.text())
    .then((response) => ({
      ...action,
      request: {
        ...action.request,
        response: JSON.parse(response, reviver),
        status: Status.Done
      }
    }))
    .catch((error) => ({
      ...action,
      request: {
        ...action.request,
        error,
        status: Status.Error
      }
    }))
    .then((done) => store.dispatch(done))
}
