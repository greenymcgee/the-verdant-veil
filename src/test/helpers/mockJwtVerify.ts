import jwt from 'jsonwebtoken'

export function mockJwtVerify() {
  const mock = { exp: Date.now() + 10 * 1000 }
  vi.spyOn(jwt, 'verify').mockImplementation(() => mock)
  return mock
}
