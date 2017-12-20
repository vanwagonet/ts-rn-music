import { shallow, ShallowWrapper } from 'enzyme'
import * as React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { actions, store } from '../../redux/store'
import Album from '../album'
import Screen from '../screen'

describe('Albums screen', () => {
  const navigation = {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    setParams: jest.fn(),
    state: {}
  } as NavigationScreenProp<any, any>

  const defaults = {
    actions,
    navigation,
    state: store.getState()
  }

  it('displays a title based on the search term', () => {
    expect(Screen.navigationOptions()).toEqual({
      title: '"The Piano Guys"'
    })
  })

  it('renders a flat list of albums', () => {
    const tree = shallow(<Screen {...defaults} />)
    expect(tree).toMatchSnapshot()
  })

  it('renders each album as a row', () => {
    const album = { collectionId: 2 } as Album
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    const row = new ShallowWrapper(render({ item: album }), tree)
    expect(row.prop('album')).toBe(album)
  })

  it('uses collectionId as key for each row', () => {
    const album = { collectionId: 2 } as Album
    const tree = shallow(<Screen {...defaults} />)
    const keyExtractor = tree.find('FlatList').prop('keyExtractor') as Function // tslint:disable-line
    expect(keyExtractor(album)).toBe('2')
  })

  it('handles row presses by navigating', () => {
    const album = { collectionId: 2, collectionCensoredName: 'albu' } as Album
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    new ShallowWrapper(render({ item: album }), tree).simulate('Press', album)
    expect(navigation.navigate).toHaveBeenCalledWith('songs', {
      collectionId: 2,
      collectionName: 'albu'
    })
  })
})
