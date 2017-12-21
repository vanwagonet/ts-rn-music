import { Audio } from 'expo'
import * as React from 'react'
import { FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Actions, State } from '../redux/store'
import Row from './row'
import Song from './song'

type Props = {
  actions: Actions
  state: State
} & NavigationScreenProps<any>

interface PlayState {
  audio?: Audio.Sound
  isLoading: boolean
  isPaused: boolean
  uri: string
}

export default class SongsScreen extends React.Component<Props, PlayState> {
  public state: PlayState = {
    isLoading: false,
    isPaused: false,
    uri: ''
  }

  public static navigationOptions = ({ navigation }: Props) => ({
    title: navigation.state.params.collectionName
  })

  public componentWillMount () {
    this.refresh()
  }

  public componentWillUnmount () {
    this.unloadAudio()
  }

  public getKeyForSong (song: Song) {
    return String(song.trackId)
  }

  public refresh = () => {
    const { getSongs } = this.props.actions.songs
    const { collectionId } = this.props.navigation.state.params
    getSongs(collectionId)
  }

  public handleSongPress = (song: Song) => {
    const { audio, isPaused, uri } = this.state
    if (song.previewUrl === uri && audio) {
      if (isPaused) {
        audio.playAsync().catch(this.handleError)
        this.setState({ isPaused: false })
      } else {
        audio.pauseAsync().catch(this.handleError)
        this.setState({ isPaused: true })
      }
    } else {
      this.unloadAudio()
      const nextAudio = new Audio.Sound()
      nextAudio.setOnPlaybackStatusUpdate(this.handlePlaybackStatusChange)
      nextAudio.loadAsync({ uri: song.previewUrl }, { shouldPlay: true })
        .catch(this.handleError)
      this.setState({
        audio: nextAudio,
        isLoading: true,
        isPaused: false,
        uri: song.previewUrl
      })
    }
  }

  public unloadAudio () {
    const { audio } = this.state
    if (audio) {
      audio.setOnPlaybackStatusUpdate()
      audio.stopAsync().catch(this.handleError)
      audio.unloadAsync().catch(this.handleError)
    }
  }

  public handlePlaybackStatusChange = (status: Audio.PlaybackStatus) => {
    if (status.uri !== this.state.uri) return
    this.setState({
      isLoading: !status.isLoaded || status.isBuffering,
      isPaused: !status.shouldPlay
    })
    if (status.didJustFinish) {
      const songs = this.props.state.songs.list
      const i = songs.findIndex(({ previewUrl }: Song) =>
        previewUrl === status.uri
      )
      const next = songs[i + 1]
      if (next) {
        this.handleSongPress(next)
      } else {
        this.unloadAudio()
        this.setState({ audio: undefined, uri: '' })
      }
    }
  }

  public handleError = () => {
    // do nothing
  }

  public renderSong = ({ item }: { item: Song }) => {
    const { isPaused, isLoading, uri } = this.state
    return (
      <Row
        onPress={this.handleSongPress}
        playState={(uri !== item.previewUrl || isPaused)
          ? 'STOPPED' : isLoading ? 'LOADING' : 'PLAYING'
        }
        song={item}
      />
    )
  }

  public render () {
    const {
      state: { songs }
    } = this.props
    return (
      <FlatList
        data={songs.list}
        extraData={this.state}
        keyExtractor={this.getKeyForSong}
        onRefresh={this.refresh}
        refreshing={songs.status === 'LOADING'}
        renderItem={this.renderSong}
      />
    )
  }
}
