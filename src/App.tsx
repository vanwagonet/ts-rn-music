import * as React from 'react'
import {
  NavigationComponent,
  NavigationScreenProps,
  StackNavigator
} from 'react-navigation'
import AlbumsScreen from './albums/screen'
import { actions, store } from './redux/store'
import SongsScreen from './songs/screen'

function App (Screen: NavigationComponent) {
  return class extends React.Component<NavigationScreenProps<any>> {
    public static navigationOptions = Screen.navigationOptions

    public state = store.getState()

    public componentWillMount () {
      this.componentWillUnmount = store.subscribe(() => {
        this.setState(store.getState())
      })
    }

    public render () {
      return (
        <Screen
          {...this.props}
          actions={actions}
          state={this.state}
        />
      )
    }
  }
}

export default StackNavigator({
  albums: {
    screen: App(AlbumsScreen)
  },
  songs: {
    screen: App(SongsScreen)
  }
})
