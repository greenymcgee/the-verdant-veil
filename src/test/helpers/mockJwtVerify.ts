import { jwtVerify } from 'jose'

export function mockJwtVerify() {
  const { payload } = vi.hoisted(() => ({
    payload: { exp: Date.now() + 10 * 1000 },
  }))
  vi.mocked(jwtVerify).mockImplementation(() =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Promise.resolve({ payload, protectedHeader: {} }),
  )
  return payload
}
