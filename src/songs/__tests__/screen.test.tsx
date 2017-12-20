import { shallow, ShallowWrapper } from 'enzyme'
import * as React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { actions, store } from '../../redux/store'
import Screen from '../screen'
import Song from '../song'

describe('Songs screen', () => {
  const navigation = {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    setParams: jest.fn(),
    state: { params: {
      collectionId: 1024117649,
      collectionName: 'Over the Hedge (Music from the Motion Picture)'
    } }
  } as NavigationScreenProp<any, any>

  const defaults = {
    actions,
    navigation,
    state: store.getState()
  }

  it('displays a title based on the collection name', () => {
    expect(Screen.navigationOptions(defaults)).toEqual({
      title: 'Over the Hedge (Music from the Motion Picture)'
    })
  })

  it('renders a flat list of songs', () => {
    const tree = shallow(<Screen {...defaults} />)
    expect(tree).toMatchSnapshot()
  })

  it('renders each song as a row', () => {
    const song = { trackId: 2 } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    const row = new ShallowWrapper(render({ item: song }), tree)
    expect(row.prop('song')).toBe(song)
  })

  it('uses trackId as key for each row', () => {
    const song = { trackId: 2 } as Song
    const tree = shallow(<Screen {...defaults} />)
    const keyExtractor = tree.find('FlatList').prop('keyExtractor') as Function // tslint:disable-line
    expect(keyExtractor(song)).toBe('2')
  })
})
