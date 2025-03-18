import { platformFactory } from '../factories'
import { SUPER_METROID } from './games'

export const SNES = platformFactory.build({}, { associations: SUPER_METROID })
