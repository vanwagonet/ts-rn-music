import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Album from './album'

const styles = StyleSheet.create({
  cover: {
    height: 32,
    marginRight: 8,
    width: 32
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#C7CDD1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    flex: 1
  }
})

interface Props {
  album: Album
  onPress: (album: Album) => void
}

export default class AlbumRow extends React.PureComponent<Props> {
  public handlePress = () => {
    this.props.onPress(this.props.album)
  }

  public render () {
    const { album } = this.props
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.handlePress}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: album.artworkUrl60 }}
            style={styles.cover}
          />
          <Text style={styles.text}>
            {album.collectionCensoredName}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
