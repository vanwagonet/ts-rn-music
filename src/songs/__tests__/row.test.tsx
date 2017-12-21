import { shallow } from 'enzyme'
import * as React from 'react'
import Row from '../row'
import Song from '../song'

describe('Song row', () => {
  const song: Song = {
    artistId: 463277,
    artistName: 'Ben Folds',
    artistViewUrl: 'https://itunes.apple.com/us/artist/ben-folds/463277?uo=4',
    artworkUrl100: 'http://is5.mzstatic.com/image/thumb/Music7/v4/4b/41/61/4b4161fd-4709-60d3-dedd-5b978ba5a2d9/source/100x100bb.jpg',
    artworkUrl30: 'http://is5.mzstatic.com/image/thumb/Music7/v4/4b/41/61/4b4161fd-4709-60d3-dedd-5b978ba5a2d9/source/30x30bb.jpg',
    artworkUrl60: 'http://is5.mzstatic.com/image/thumb/Music7/v4/4b/41/61/4b4161fd-4709-60d3-dedd-5b978ba5a2d9/source/60x60bb.jpg',
    collectionArtistId: 80204262,
    collectionArtistName: 'Various Artists',
    collectionCensoredName: 'Over the Hedge (Music from the Motion Picture)',
    collectionExplicitness: 'notExplicit',
    collectionId: 1024117649,
    collectionName: 'Over the Hedge (Music from the Motion Picture)',
    collectionPrice: 9.99,
    collectionViewUrl: 'https://itunes.apple.com/us/album/rockin-suburb-feat-william-shatner-over-hedge-version/1024117649?i=1024118307&uo=4',
    country: 'USA',
    currency: 'USD',
    discCount: 1,
    discNumber: 1,
    isStreamable: true,
    kind: 'song',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music5/v4/37/ef/b5/37efb519-67ae-66dc-9a03-01d4f7dc0f9f/mzaf_4597133905932347225.plus.aac.p.m4a',
    primaryGenreName: 'Pop',
    releaseDate: new Date('2006-05-16T07:00:00.000Z'),
    trackCensoredName: 'Rockin\' the Suburb (feat. William Shatner) [Over the Hedge Version]',
    trackCount: 13,
    trackExplicitness: 'notExplicit',
    trackId: 1024118307,
    trackName: 'Rockin\' the Suburb (feat. William Shatner)',
    trackNumber: 10,
    trackPrice: 1.29,
    trackTimeMillis: 296093,
    trackViewUrl: 'https://itunes.apple.com/us/album/rockin-suburb-feat-william-shatner-over-hedge-version/1024117649?i=1024118307&uo=4',
    wrapperType: 'track'
  }

  it('renders the STOPPED state', () => {
    const tree = shallow(
      <Row onPress={jest.fn()} playState='STOPPED' song={song} />
    )
    expect(tree).toMatchSnapshot()
  })

  it('renders the LOADING state', () => {
    const tree = shallow(
      <Row onPress={jest.fn()} playState='LOADING' song={song} />
    )
    expect(tree).toMatchSnapshot()
  })

  it('renders the PLAYING state', () => {
    const tree = shallow(
      <Row onPress={jest.fn()} playState='PLAYING' song={song} />
    )
    expect(tree).toMatchSnapshot()
  })

  it('calls back with the song when pressed', () => {
    const onPress = jest.fn()
    const tree = shallow(
      <Row onPress={onPress} playState='STOPPED' song={song} />
    )
    tree.find('TouchableHighlight').simulate('Press')
    expect(onPress).toHaveBeenCalledWith(song)
  })
})
