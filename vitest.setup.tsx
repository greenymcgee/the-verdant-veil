/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

import '@testing-library/jest-dom'

process.env.NEXT_PUBLIC_THE_VERDANT_VEIL_API_URL =
  'http://www.test_the_verdant_veil_api.com'

vi.mock('next/cache', async () => {
  const cache = await vi.importActual('next/cache')
  return {
    ...cache,
    revalidatePath: vi.fn(),
    revalidateTag: vi.fn(),
  }
})

vi.mock('next/headers', async () => {
  const deleteCookie = vi.fn()
  const get = vi.fn()
  const set = vi.fn()
  const headersGet = vi.fn()
  return {
    cookies: vi
      .fn()
      .mockImplementation(() => ({ delete: deleteCookie, get, set })),
    headers: vi.fn().mockImplementation(() => ({ get: headersGet })),
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
    useSearchParams: vi
      .fn()
      .mockImplementation(
        () => new URLSearchParams(mockRouter.query as Record<string, string>),
      ),
  }
})

// https://github.com/vercel/next.js/discussions/60125#discussioncomment-9653211
vi.mock('next/link', () => {
  interface Props {
    children: React.ReactNode
    href: string
    onClick: () => void
  }
  function mockLink({ children, href, onClick, ...options }: Props) {
    return (
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault()
          onClick()
        }}
        {...options}
      >
        {children}
      </a>
    )
  }
  mockLink.displayName = 'Link'
  return { default: mockLink }
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

vi.mock('./src/lib/logger.ts', async () => {
  const { logger } = await vi.importActual('./src/lib/logger.ts')
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
