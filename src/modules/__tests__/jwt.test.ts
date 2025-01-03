import jwt from 'jsonwebtoken'

import { mockJwtVerify } from '@/test/helpers'

import { verifyJwt } from '..'

afterEach(() => vi.restoreAllMocks())

describe('jwt module', () => {
  describe('verifyJwt', () => {
    it('should throw an error when the jwt is not an object', () => {
      vi.spyOn(jwt, 'verify').mockImplementation(() => '')
      expect(() => verifyJwt('')).toThrow(Error('Invalid JWT'))
    })

    it('should return a valid jwt', () => {
      const decodedJwt = mockJwtVerify()
      expect(verifyJwt('token')).toEqual(decodedJwt)
    })
  })
})
