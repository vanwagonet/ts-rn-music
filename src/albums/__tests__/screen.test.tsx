import { shallow } from 'enzyme'
import * as React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { actions, store } from '../../redux/store'
import Screen from '../screen'

describe('Albums screen', () => {
  const navigation = {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    setParams: jest.fn(),
    state: {}
  } as NavigationScreenProp<any, any>

  it('renders a flat list of albums', () => {
    const tree = shallow(
      <Screen
        actions={actions}
        navigation={navigation}
        state={store.getState()}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
