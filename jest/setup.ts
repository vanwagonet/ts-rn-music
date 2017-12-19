import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

interface FetchAPI {
  fetch?: () => Promise<any>
}
const window: FetchAPI = global as FetchAPI
window.fetch = jest.fn(() => Promise.resolve({ text: () => 'null' }))
