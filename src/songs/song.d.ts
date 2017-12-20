export default interface Song {
  wrapperType: 'track'
  kind: 'song'
  trackId: number
  trackName: string
  trackCensoredName: string
  trackViewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  previewUrl: string
  radioStationUrl?: string
  isStreamable?: boolean
  collectionArtistId?: number
  collectionArtistName?: string
  collectionId: number
  collectionName: string
  collectionCensoredName: string
  collectionViewUrl: string
  artistId: number
  artistName: string
  artistViewUrl: string
  collectionPrice: number
  trackPrice: number
  currency: string
  collectionExplicitness: 'notExplicit' | 'explicit'
  trackExplicitness: 'notExplicit' | 'explicit'
  discCount: number
  discNumber: number
  trackCount: number
  trackNumber: number
  trackTimeMillis: number
  releaseDate: Date
  country: string
  primaryGenreName: string
}
