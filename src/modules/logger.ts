import pino from 'pino'

let logger: ReturnType<typeof pino>
;(async () => {
  // Logger for middleware
  if (process.env.NEXT_RUNTIME === 'edge') {
    logger = pino({ transport: { target: 'pino-pretty' } })
    return
  }

  // Logger for server
  if (typeof window === 'undefined') {
    const pinoPretty = await import('pino-pretty').then((module) =>
      module.default(),
    )
    logger = pino(pinoPretty)
    return
  }

  // Logger for browser
  logger = pino({ transport: { target: 'pino-pretty' } })
})()

export { logger }
