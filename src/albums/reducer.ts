import { Status } from '../redux/request'
import { Action } from './actions'
import Album from './album'

export interface State {
  error?: Error
  list: Album[]
  status: Status
}

const initialState: State = {
  error: undefined,
  list: [],
  status: Status.Unsent
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'getAlbums': {
      const { error, response, status } = action.request
      let list = state.list
      if (status === Status.Done) {
        list = response && response.results.filter(
          ({ collectionType }) => collectionType === 'Album'
        ) || []
      }
      return {
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
