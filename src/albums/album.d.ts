export default interface Album {
  wrapperType: 'collection'
  collectionType: 'Album'
  collectionId: number
  collectionName: string
  collectionCensoredName: string
  collectionViewUrl: string
  artworkUrl60: string
  artworkUrl100: string
  artistId: number
  amgArtistId?: number
  artistName: string
  artistViewUrl?: string
  collectionPrice: number
  currency: string
  collectionExplicitness: 'notExplicit' | 'explicit'
  trackCount: number
  copyright: string
  country: string
  releaseDate: Date
  primaryGenreName: string
}
