import { AllowedUriFacade } from '../../facades'
import { isAllowedUri } from '..'

describe('isAllowedUri', () => {
  it('should utilize the facade', () => {
    const url = 'http://ned-not.com'
    const context = {
      defaultProtocol: '',
      defaultValidate: vi.fn(),
      protocols: [],
    }
    const result = isAllowedUri(url, context)
    expect(result).toBe(new AllowedUriFacade(url, context).allowed)
  })
})
