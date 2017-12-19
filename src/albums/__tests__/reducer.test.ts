import { Status } from '../../redux/request'
import { Action } from '../actions'
import Album from '../album'
import reducer from '../reducer'

describe('Albums reducer', () => {
  const defaultState = reducer(undefined, {} as Action)

  it('has a default empty state', () => {
    expect(defaultState).toEqual({
      error: undefined,
      list: [],
      status: Status.Unsent
    })
  })

  describe('getAlbums handler', () => {
    const type = 'getAlbums'

    it('handles pending', () => {
      const action: Action = {
        request: {
          status: Status.Loading,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        status: Status.Loading
      })
    })

    it('handles success', () => {
      const action: Action = {
        request: {
          response: {
            resultCount: 2,
            results: [
              { collectionId: 2, collectionType: 'Album' } as Album,
              { collectionId: 1 } as Album
            ]
          },
          status: Status.Done,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        list: [ { collectionId: 2, collectionType: 'Album' } ],
        status: Status.Done
      })
    })

    it('handles empty success', () => {
      const action: Action = {
        request: {
          status: Status.Done,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        list: [],
        status: Status.Done
      })
    })

    it('handles error', () => {
      const action: Action = {
        request: {
          error: new Error('Failure'),
          status: Status.Error,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        error: action.request.error,
        status: Status.Error
      })
    })
  })
})
