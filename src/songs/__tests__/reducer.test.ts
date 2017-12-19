import { Status } from '../../redux/request'
import { Action } from '../actions'
import reducer from '../reducer'
import Song from '../song'

describe('Songs reducer', () => {
  const defaultState = reducer(undefined, {} as Action)

  it('has a default empty state', () => {
    expect(defaultState).toEqual({
      collectionId: 0,
      error: undefined,
      list: [],
      status: Status.Unsent
    })
  })

  describe('getSongs handler', () => {
    const type = 'getSongs'

    it('handles pending', () => {
      const action: Action = {
        collectionId: 1,
        request: {
          status: Status.Loading,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        collectionId: 1,
        status: Status.Loading
      })
    })

    it('handles success', () => {
      const action: Action = {
        collectionId: 1,
        request: {
          response: {
            resultCount: 2,
            results: [
              { trackId: 2, kind: 'song' } as Song,
              { collectionId: 1 } as Song
            ]
          },
          status: Status.Done,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        collectionId: 1,
        list: [ { trackId: 2, kind: 'song' } ],
        status: Status.Done
      })
    })

    it('handles error', () => {
      const action: Action = {
        collectionId: 1,
        request: {
          error: new Error('Failure'),
          status: Status.Error,
          url: ''
        },
        type
      }
      expect(reducer(defaultState, action)).toEqual({
        ...defaultState,
        collectionId: 1,
        error: action.request.error,
        status: Status.Error
      })
    })
  })
})
