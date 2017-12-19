import { Status } from '../redux/request'
import { Action } from './actions'
import Song from './song'

export interface State {
  collectionId: number
  error?: Error
  list: Song[]
  status: Status
}

const initialState: State = {
  collectionId: 0,
  error: undefined,
  list: [],
  status: Status.Unsent
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'getSongs': {
      const { error, response, status } = action.request
      let list = action.collectionId === state.collectionId
        ? state.list : []
      if (status === Status.Done) {
        list = response && response.results.filter(
          ({ kind }) => kind === 'song'
        ) || []
      }
      return {
        collectionId: action.collectionId,
        error,
        list,
        status
      }
    }
    default:
      const type: never = action.type // tslint:disable-line
      return state
  }
}
