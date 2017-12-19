import { request, Request } from '../redux/request'
import Album from './album'

interface GetAlbums {
  request: Request<{ resultCount: number, results: Album[] }>
  type: 'getAlbums'
}

export type Action =
  GetAlbums

export default {
  getAlbums: (type: 'artist' | 'album', term: string): GetAlbums => ({
    request: request(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&attribute=${type}Term&media=music&entity=album`
    ),
    type: 'getAlbums'
  })
}
