import { actions, store } from '../store'

describe('redux store', () => {
  it('exports a redux store', () => {
    expect(store.getState()).toEqual({
      albums: expect.any(Object),
      songs: expect.any(Object)
    })
  })

  it('exports actions for albums', () => {
    expect(actions.albums).toMatchObject({
      getAlbums: expect.any(Function)
    })
  })

  it('exports actions for songs', () => {
    expect(actions.songs).toMatchObject({
      getSongs: expect.any(Function)
    })
  })
})
