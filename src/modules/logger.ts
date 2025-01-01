import winston from 'winston'

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [new winston.transports.Console()],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}
