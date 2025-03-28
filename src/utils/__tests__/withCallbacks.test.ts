import { withCallbacks } from '..'

const serverAction = vi.fn()
const onSuccess = vi.fn()
const onError = vi.fn()

afterEach(() => vi.clearAllMocks())

describe('withCallbacks', () => {
  it('should call the serverAction', () => {
    withCallbacks(serverAction, {})()
    expect(serverAction).toHaveBeenCalledTimes(1)
  })

  it('should call the onSuccess callback', async () => {
    serverAction.mockReturnValue({ status: 'success' })
    await withCallbacks(serverAction, { onSuccess })()
    expect(onSuccess).toHaveBeenCalledWith({ status: 'success' })
  })

  it('should call the onError callback', async () => {
    serverAction.mockReturnValue({ status: 'failure' })
    await withCallbacks(serverAction, { onError })()
    expect(onError).toHaveBeenCalledWith({ status: 'failure' })
  })
})
