import middleware, { request, Status } from '../request'

describe('redux request', () => {
  describe('request creator', () => {
    const options = {
      headers: { 'Content-Length': '0' },
      method: 'GET'
    }
    expect(request('data:text/plain,', options)).toEqual({
      options,
      status: Status.Unsent,
      url: 'data:text/plain,'
    })
  })

  describe('middleware', () => {
    interface FetchAPI {
      fetch?: () => Promise<any>
    }
    const window: FetchAPI = global as FetchAPI
    const next = jest.fn((a) => a)
    const store = {
      dispatch: jest.fn((a) => a),
      getState: jest.fn()
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('passes through non-request actions', () => {
      const action = { type: '' }
      const result = middleware(store)(next)(action)
      expect(result).toBe(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).not.toHaveBeenCalled()
    })

    it('sets status to loading before forwarding request actions', () => {
      window.fetch = jest.fn(() => Promise.resolve({ text: () => '{}' }))
      const action = { type: 'r', request: request('url') }
      middleware(store)(next)(action)
      expect(next).toHaveBeenCalledWith({
        ...action,
        request: {
          ...action.request,
          status: Status.Loading
        }
      })
    })

    it('dispatches done action when fetch succeeds', async () => {
      window.fetch = jest.fn(() => Promise.resolve({ text: () =>
        '{ "date": "2017-12-18T19:06:30.274Z" }'
      }))
      const action = { type: 'success', request: request('url') }
      const result = await middleware(store)(next)(action)
      expect(window.fetch).toHaveBeenCalledWith('url', undefined)
      expect(result).toEqual({
        ...action,
        request: {
          ...action.request,
          response: { date: new Date('2017-12-18T19:06:30.274Z') },
          status: Status.Done
        }
      })
      expect(store.dispatch).toHaveBeenCalledWith(result)
    })

    it('dispatches error action when fetch fails', async () => {
      const error = new TypeError('Network request failed')
      window.fetch = jest.fn(() => Promise.reject(error))
      const action = { type: 'fail', request: request('url') }
      const result = await middleware(store)(next)(action)
      expect(result).toEqual({
        ...action,
        request: {
          ...action.request,
          error,
          status: Status.Error
        }
      })
      expect(store.dispatch).toHaveBeenCalledWith(result)
    })
  })
})
