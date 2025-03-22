import { Factory } from 'fishery'

export const gameModeFactory = Factory.define<GameMode>(({ sequence }) => ({
  createdAt: '',
  description: 'A game mode',
  id: sequence,
  igdbId: sequence,
  name: 'Single Player',
  slug: 'single-player',
  updatedAt: '',
}))
