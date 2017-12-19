import { request, Request } from '../redux/request'
import Song from './song'

interface GetSongs {
  collectionId: number
  request: Request<{ resultCount: number, results: Song[] }>
  type: 'getSongs'
}

export type Action =
  GetSongs

export default {
  getSongs: (collectionId: number): GetSongs => ({
    collectionId,
    request: request(
      `https://itunes.apple.com/lookup?id=${collectionId}&media=music&entity=song`
    ),
    type: 'getSongs'
  })
}
