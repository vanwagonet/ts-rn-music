import { shallow } from 'enzyme'
import * as React from 'react'
import App from '../app'
import { actions, store } from '../redux/store'

describe('App', () => {
  it('creates a navigator for albums and songs', () => {
    expect(App.router.getComponentForRouteName('albums')).toBeTruthy()
    expect(App.router.getComponentForRouteName('songs')).toBeTruthy()
  })

  it('passes the actions and state into the screen', () => {
    const AlbumsScreen = App.router.getComponentForRouteName('albums')
    const tree = shallow(<AlbumsScreen />)
    expect(tree.find('AlbumsScreen').props()).toEqual({
      actions,
      state: store.getState()
    })
  })

  it('subscribes to changes to the store', () => {
    const AlbumsScreen = App.router.getComponentForRouteName('albums')
    const tree = shallow(<AlbumsScreen />)
    tree.instance().setState = jest.fn()
    store.dispatch({ type: '@bogus' })
    expect(tree.instance().setState).toHaveBeenCalledWith(store.getState())
  })
})
