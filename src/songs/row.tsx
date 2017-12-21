import { Svg } from 'expo'
import * as React from 'react'
import {
  ActivityIndicator,
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
  spinner: {
    height: 32,
    position: 'absolute',
    width: 32
  },
  text: {
    flex: 1
  }
})

interface Props {
  onPress: (song: Song) => void
  playState: 'LOADING' | 'PLAYING' | 'STOPPED'
  song: Song
}

export default class SongRow extends React.PureComponent<Props> {
  public handlePress = () => {
    this.props.onPress(this.props.song)
  }

  public render () {
    const { playState, song } = this.props
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.handlePress}
      >
        <View style={styles.row}>
          <View style={styles.cover}>
            <ActivityIndicator
              animating={playState === 'LOADING'}
              hidesWhenStopped
              size='small'
              style={styles.spinner}
            />
            <Svg height={32} width={32}>
              <Svg.Path
                d={playState === 'STOPPED'
                  ? 'M8 8 L24 16 L8 24Z'
                  : 'M8 8 h4.8 v16 h-4.8z M19.2 8 h4.8 v16 h-4.8z'
                }
                originX={16}
                originY={16}
                scale={playState === 'LOADING' ? 0.5 : 1}
              />
            </Svg>
          </View>
          <Text style={styles.text}>
            {song.trackCensoredName}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
