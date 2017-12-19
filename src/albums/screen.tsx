import * as React from 'react'
import { FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Actions, State } from '../redux/store'
import Album from './album'
import Row from './row'

type Props = {
  actions: Actions
  state: State
} & NavigationScreenProps<any>

export default class AlbumsScreen extends React.Component<Props> {
  public static navigationOptions = () => ({
    title: '"The Piano Guys"'
  })

  public componentWillMount () {
    this.refresh()
  }

  public getKeyForAlbum (album: Album) {
    return String(album.collectionId)
  }

  public refresh = () => {
    const { getAlbums } = this.props.actions.albums
    getAlbums('artist', 'The Piano Guys')
  }

  public handleAlbumSelect = (album: Album) => {
    this.props.navigation.navigate('songs', {
      collectionId: album.collectionId,
      collectionName: album.collectionCensoredName
    })
  }

  public renderAlbum = ({ item }: { item: Album }) => {
    return (
      <Row
        album={item}
        onPress={this.handleAlbumSelect}
      />
    )
  }

  public render () {
    const {
      state: { albums }
    } = this.props
    return (
      <FlatList
        data={albums.list}
        keyExtractor={this.getKeyForAlbum}
        onRefresh={this.refresh}
        refreshing={albums.status === 'LOADING'}
        renderItem={this.renderAlbum}
      />
    )
  }
}
