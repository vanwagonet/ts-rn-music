import { shallow } from 'enzyme'
import * as React from 'react'
import Album from '../album'
import Row from '../row'

describe('Album row', () => {
  const album: Album = {
    artistId: 80204262,
    artistName: 'Various Artists',
    artworkUrl100: 'http://is5.mzstatic.com/image/thumb/Music7/v4/4b/41/61/4b4161fd-4709-60d3-dedd-5b978ba5a2d9/source/100x100bb.jpg',
    artworkUrl60: 'http://is5.mzstatic.com/image/thumb/Music7/v4/4b/41/61/4b4161fd-4709-60d3-dedd-5b978ba5a2d9/source/60x60bb.jpg',
    collectionCensoredName: 'Over the Hedge (Music from the Motion Picture)',
    collectionExplicitness: 'notExplicit',
    collectionId: 1024117649,
    collectionName: 'Over the Hedge (Music from the Motion Picture)',
    collectionPrice: 9.99,
    collectionType: 'Album',
    collectionViewUrl: 'https://itunes.apple.com/us/album/over-the-hedge-music-from-the-motion-picture/1024117649?uo=4',
    copyright: '℗ 2006 DreamWorks Animation L.L.C., / (P) 2001, 2006 Epic Records, a division of Sony Music Entertainment',
    country: 'USA',
    currency: 'USD',
    primaryGenreName: 'Pop',
    releaseDate: new Date('2006-05-16T07:00:00.000Z'),
    trackCount: 13,
    wrapperType: 'collection'
  }

  it('renders the album image and censored name', () => {
    const tree = shallow(<Row album={album} onPress={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })

  it('calls back with the album when pressed', () => {
    const onPress = jest.fn()
    const tree = shallow(<Row album={album} onPress={onPress} />)
    tree.find('TouchableHighlight').simulate('Press')
    expect(onPress).toHaveBeenCalledWith(album)
  })
})
