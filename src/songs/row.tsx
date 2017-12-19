import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Song from './song'

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
  song: Song
}

export default class SongRow extends React.PureComponent<Props> {
  public render () {
    const { song } = this.props
    return (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <View style={styles.row}>
          <Image
            source={{ uri: song.artworkUrl60 }}
            style={styles.cover}
          />
          <Text style={styles.text}>
            {song.trackCensoredName}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
