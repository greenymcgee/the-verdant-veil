import { Factory } from 'fishery'

export const gameEngineFactory = Factory.define<GameEngine>(({ sequence }) => ({
  createdAt: '',
  description: 'A game engine',
  id: sequence,
  igdbId: sequence,
  name: 'Unreal',
  slug: 'unreal',
  updatedAt: '',
}))
