import pino from 'pino'

async function importPinoPretty() {
  if (process.env.NEXT_RUNTIME === 'edge') return {}

  const pinoPretty = await import('pino-pretty').then(
    (pinoPretty) => pinoPretty.default,
  )
  return pinoPretty()
}

let logger: ReturnType<typeof pino>
;(async () => {
  logger = pino(await importPinoPretty())
})()

export { logger }
