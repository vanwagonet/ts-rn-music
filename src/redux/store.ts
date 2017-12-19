import {
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  createStore
} from 'redux'
import albumsActions from '../albums/actions'
import albumsReducer, { State as AlbumsState } from '../albums/reducer'
import songsActions from '../songs/actions'
import songsReducer, { State as SongsState } from '../songs/reducer'
import requestMiddleware from './request'

export interface State {
  albums: AlbumsState
  songs: SongsState
}

export const store = createStore<State>(combineReducers({
  albums: albumsReducer,
  songs: songsReducer
}), applyMiddleware(requestMiddleware))

export const actions = {
  albums: bindActionCreators(albumsActions, store.dispatch),
  songs: bindActionCreators(songsActions, store.dispatch)
}

export type Actions = typeof actions
