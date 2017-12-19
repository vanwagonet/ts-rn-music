import creators from '../actions'

describe('Song actions', () => {
  it('can search for songs by collectionId', () => {
    expect(creators.getSongs(12345)).toEqual({
      collectionId: 12345,
      request: {
        status: 'UNSENT',
        url: 'https://itunes.apple.com/lookup?id=12345&media=music&entity=song'
      },
      type: 'getSongs'
    })
  })
})
