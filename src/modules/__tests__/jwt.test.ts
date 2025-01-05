import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

import { mockAuthenticatedNextRequest, mockJwtVerify } from '@/test/helpers'

import { authenticateUser, verifyJwt } from '..'

describe('jwt module', () => {
  describe('verifyJwt', () => {
    it('should throw an error when the jwt is not an object', async () => {
      vi.mocked(jwtVerify).mockImplementation(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Promise.resolve({ payload: '' }),
      )
      await expect(verifyJwt('token')).rejects.toThrow(Error('Invalid JWT'))
    })

    it('should return a valid jwt', async () => {
      const payload = mockJwtVerify()
      expect(await verifyJwt('token')).toEqual(payload)
    })
  })

  describe('authenticateUser', () => {
    it('should throw an error when the cookie is blank', async () => {
      await expect(
        authenticateUser(new NextRequest('http://test.com')),
      ).rejects.toThrow('Authenticate User: Missing JWT')
    })

    it('should verify the token', async () => {
      const mockedJwt = mockJwtVerify()
      const decodedJwt = await authenticateUser(mockAuthenticatedNextRequest())
      expect(decodedJwt.exp).toEqual(mockedJwt.exp)
    })
  })
})
