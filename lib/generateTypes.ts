import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import { compileFromFile, Options } from 'json-schema-to-typescript'
import { resolve } from 'path'
import { snakeCase } from 'snake-case'

/**
 * This script collects the JSON schemas from green-quest-api and generates type
 * declaration files for each one of them.
 */

const SCHEMA_DIR = 'schemas'
const GENERATED_TYPES_DIR = 'generated-types'
const API_SCHEMA_PATH = 'test/support/api/schemas'
const LOCAL_API_GIT_REPO = process.env.LOCAL_GREEN_QUEST_API_GIT_REPO
const PRETTIER_CONFIG_PATH = '.prettierrc.json'

const archiveArgs = [
  `--remote=${LOCAL_API_GIT_REPO}`,
  `--prefix=${SCHEMA_DIR}/`,
  `HEAD:${API_SCHEMA_PATH}`,
].join(' ')

execSync(`rm -rf ${SCHEMA_DIR}`)
execSync(`rm -rf ${GENERATED_TYPES_DIR}`)
execSync(`mkdir ${GENERATED_TYPES_DIR}`)

execSync(`git archive ${archiveArgs} | tar xvf -`)

const schemas = glob.sync(`${SCHEMA_DIR}/**/*.json`)

const compilerOptions: Partial<Options> = {
  $refOptions: {
    resolve: {
      resolver: {
        canRead: true,
        order: 1,
        read(file: { url: string }) {
          const newUrl = file.url.replace(/file:\/\//, resolve(SCHEMA_DIR))
          return readFileSync(newUrl, 'utf-8')
        },
      },
    },
  },
  style: JSON.parse(readFileSync(resolve(PRETTIER_CONFIG_PATH), 'utf-8')),
}

schemas.forEach((schema) => {
  const sanitized = snakeCase(
    schema.replace(`${SCHEMA_DIR}/`, '').replace(/.json/, ''),
  )

  compileFromFile(schema, compilerOptions).then((ts) => {
    const modified = ts
      .replace(/export interface/g, 'interface')
      .replace(/ File/g, ' ')
      .replace(/export type/g, 'type')

    writeFileSync(resolve(GENERATED_TYPES_DIR, `${sanitized}.d.ts`), modified)
  })
})

// eslint-disable-next-line no-console
console.log('\n\nDone! ✨\n\n')
