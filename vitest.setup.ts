/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

import '@testing-library/jest-dom'

process.env.NEXT_PUBLIC_GREEN_QUEST_API_URL = 'http://www.test_api.com'

vi.mock('next/cache', async () => {
  const cache = await vi.importActual('next/cache')
  return {
    ...cache,
    revalidateTag: vi.fn(),
  }
})

vi.mock('next/headers', async () => {
  const headers = await vi.importActual('next/headers')
  const get = vi.fn()
  const set = vi.fn()
  return {
    ...headers,
    cookies: vi.fn().mockImplementation(() => ({ get, set })),
  }
})

vi.mock('next/navigation', async () => {
  const mockRouter = await vi.importActual('next-router-mock')
  // @ts-ignore
  mockRouter.useParser(createDynamicRouteParser(['/reset-password/[token]']))
  return {
    redirect: vi
      .fn()
      // @ts-ignore
      .mockImplementation((pathname: string) => mockRouter.push(pathname)),
    useParams: () => mockRouter.query,
    usePathname: () => mockRouter.pathname,
    useRouter: mockRouter.useRouter,
    useSearchParams: () =>
      new URLSearchParams(mockRouter.query as Record<string, string>),
  }
})

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(), // deprecated
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(), // deprecated
    })),
    writable: true,
  })
})

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = false
  })
})

vi.mock('./src/modules/logger.ts', async () => {
  const { logger } = await vi.importActual('./src/modules/logger.ts')
  return {
    logger: {
      ...(logger as Record<string, unknown>),
      error: vi.fn(),
      info: vi.fn(),
    },
  }
})

vi.mock('jose', async () => {
  const jose = await vi.importActual('jose')
  const payload = { exp: Date.now() + 10 * 1000 }
  return {
    ...jose,
    jwtVerify: vi.fn().mockImplementation(() => ({ payload })),
  }
})

/* eslint-enable @typescript-eslint/ban-ts-comment */
