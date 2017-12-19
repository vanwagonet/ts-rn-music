import { shallow } from 'enzyme'
import * as React from 'react'
import App from '../app'

it('renders without crashing', () => {
  const rendered = shallow(<App />)
  expect(rendered).toBeTruthy()
})
