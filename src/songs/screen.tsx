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

export default class SongsScreen extends React.Component<Props> {
  public static navigationOptions = ({ navigation }: Props) => ({
    title: navigation.state.params.collectionName
  })

  public componentWillMount () {
    this.refresh()
  }

  public getKeyForSong (song: Song) {
    return String(song.trackId)
  }

  public refresh = () => {
    const { getSongs } = this.props.actions.songs
    const { collectionId } = this.props.navigation.state.params
    getSongs(collectionId)
  }

  public renderSong ({ item }: { item: Song }) {
    return (
      <Row song={item} />
    )
  }

  public render () {
    const {
      state: { songs }
    } = this.props
    return (
      <FlatList
        data={songs.list}
        keyExtractor={this.getKeyForSong}
        onRefresh={this.refresh}
        refreshing={songs.status === 'LOADING'}
        renderItem={this.renderSong}
      />
    )
  }
}
