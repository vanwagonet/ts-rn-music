import { shallow, ShallowWrapper } from 'enzyme'
import { Audio } from 'expo'
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
    const song = { trackId: 2, previewUrl: '2' } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    let row = new ShallowWrapper(render({ item: song }), tree)
    expect(row.prop('song')).toBe(song)
    expect(row.prop('playState')).toBe('STOPPED')

    tree.setState({ uri: '2', isLoading: true })
    row = new ShallowWrapper(render({ item: song }), tree)
    expect(row.prop('playState')).toBe('LOADING')

    tree.setState({ isLoading: false })
    row = new ShallowWrapper(render({ item: song }), tree)
    expect(row.prop('playState')).toBe('PLAYING')
  })

  it('uses trackId as key for each row', () => {
    const song = { trackId: 2 } as Song
    const tree = shallow(<Screen {...defaults} />)
    const keyExtractor = tree.find('FlatList').prop('keyExtractor') as Function // tslint:disable-line
    expect(keyExtractor(song)).toBe('2')
  })

  it('unloads the audio on unmount', () => {
    const tree = shallow(<Screen {...defaults} />)
    const audio = {
      setOnPlaybackStatusUpdate: jest.fn(),
      stopAsync: jest.fn(() => Promise.resolve()),
      unloadAsync: jest.fn(() => Promise.resolve())
    }
    tree.setState({ audio })
    tree.unmount()
    expect(audio.setOnPlaybackStatusUpdate).toHaveBeenCalledWith()
    expect(audio.stopAsync).toHaveBeenCalledWith()
    expect(audio.unloadAsync).toHaveBeenCalledWith()
  })

  it('starts playing preview when song row is pressed', () => {
    const song = { previewUrl: 'preview' } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    new ShallowWrapper(render({ item: song }), tree).simulate('Press', song)
    expect(tree.state('uri')).toBe('preview')
  })

  it('starts playing preview when song row is pressed', () => {
    const song = { previewUrl: 'preview' } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    new ShallowWrapper(render({ item: song }), tree).simulate('Press', song)
    expect(tree.state('uri')).toBe('preview')
  })

  it('pauses the song when pressed again', () => {
    const song = { previewUrl: 'preview' } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    const row = new ShallowWrapper(render({ item: song }), tree)
    row.simulate('Press', song)
    row.simulate('Press', song)
    expect(tree.state('isPaused')).toBe(true)
  })

  it('resumes paused song when pressed again', () => {
    const song = { previewUrl: 'preview' } as Song
    const tree = shallow(<Screen {...defaults} />)
    const render = tree.find('FlatList').prop('renderItem') as Function // tslint:disable-line
    const row = new ShallowWrapper(render({ item: song }), tree)
    row.simulate('Press', song)
    row.simulate('Press', song)
    row.simulate('Press', song)
    expect(tree.state('isPaused')).toBe(false)
  })

  it('ignores status change from non-current audio', () => {
    const tree = shallow(<Screen {...defaults} />)
    tree.setState({ isLoading: false, uri: 'playing' })
    const screen = tree.instance() as Screen
    screen.handlePlaybackStatusChange({
      isBuffering: true,
      isLoaded: true,
      uri: 'old'
    } as Audio.PlaybackStatus)
    expect(tree.state('isLoading')).toBe(false)
  })

  it('sets loading and paused from status', () => {
    const tree = shallow(<Screen {...defaults} />)
    tree.setState({ isLoading: false, isPaused: false, uri: 'paused' })
    const screen = tree.instance() as Screen
    screen.handlePlaybackStatusChange({
      isBuffering: true,
      isLoaded: true,
      shouldPlay: false,
      uri: 'paused'
    } as Audio.PlaybackStatus)
    expect(tree.state('isLoading')).toBe(true)
    expect(tree.state('isPaused')).toBe(true)
  })

  it('moves on to next song when finished', () => {
    const state = JSON.parse(JSON.stringify(defaults.state))
    state.songs.list = [
      { trackId: 1, previewUrl: 'one' },
      { trackId: 2, previewUrl: 'two' }
    ]
    const tree = shallow(<Screen {...defaults} state={state} />)
    tree.setState({ uri: 'one' })
    const screen = tree.instance() as Screen
    screen.handlePlaybackStatusChange({
      didJustFinish: true,
      uri: 'one'
    } as Audio.PlaybackStatus)
    expect(tree.state('uri')).toBe('two')
    screen.handlePlaybackStatusChange({
      didJustFinish: true,
      uri: 'two'
    } as Audio.PlaybackStatus)
    expect(tree.state('uri')).toBe('')
  })
})
