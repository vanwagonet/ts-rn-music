import creators from '../actions'

describe('Album actions', () => {
  it('can search for albums by name', () => {
    expect(creators.getAlbums('artist', 'Michael Jackson')).toEqual({
      request: {
        status: 'UNSENT',
        url: 'https://itunes.apple.com/search?term=Michael%20Jackson&attribute=artistTerm&media=music&entity=album'
      },
      type: 'getAlbums'
    })
  })
})
