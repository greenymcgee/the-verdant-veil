import { kebabCase } from 'change-case'
import { Factory } from 'fishery'

import { companyFactory } from './company'
import { coverFactory } from './cover'
import { gameModeFactory } from './gameMode'
import { genreFactory } from './genre'
import { platformFactory } from './platform'
import { playerPerspectiveFactory } from './playerPerspective'
import { screenshotFactory } from './screenshot'
import { themeFactory } from './theme'

const currentTime = new Date().toISOString()

export const gameFactory = Factory.define<Game>(
  ({ associations, params, sequence }) => ({
    ageRatings: associations.ageRatings || [],
    artworks: associations.artworks || [],
    bannerImage: { mobile: { url: '' }, url: '' },
    cover: coverFactory.build(),
    createdAt: currentTime,
    currentlyPlaying: false,
    developers: associations.developers || [
      companyFactory.build({ name: `Developer ${sequence}: 1` }),
      companyFactory.build({ name: `Developer ${sequence}: 2` }),
    ],
    estimatedFirstPlayedDate: null,
    featuredVideoId: '',
    firstReleaseDate: '1999-01-09T00:00:00Z',
    franchises: associations.franchises || [],
    gameEngines: associations.gameEngines || [],
    gameModes: associations.gameModes || [gameModeFactory.build()],
    genres: associations.genres || [genreFactory.build()],
    id: sequence,
    igdbId: sequence,
    lastPlayedDate: null,
    name: 'Super Metroid',
    platforms: associations.platforms || [platformFactory.build()],
    playerPerspectives: associations.playerPerspectives || [
      playerPerspectiveFactory.build(),
    ],
    porters: associations.porters || [],
    published: false,
    publishedAt: null,
    publishers: associations.publishers || [
      companyFactory.build({ name: `Publisher ${sequence}: 1` }),
      companyFactory.build({ name: `Publisher ${sequence}: 2` }),
    ],
    rating: 5,
    releaseDates: associations.releaseDates || [],
    review: '<p>So good</p>',
    reviewTitle: '',
    screenshots: associations.screenshots || [
      screenshotFactory.build(),
      screenshotFactory.build(),
    ],
    slug: params.slug || kebabCase(params.name ?? ''),
    storyline: `${params.name} storyline.`,
    summary: `${params.name} summary.`,
    supporters: associations.supporters || [],
    themes: associations.themes || [themeFactory.build()],
    updatedAt: currentTime,
    videos: associations.videos || [],
    websites: associations.websites || [],
  }),
)
