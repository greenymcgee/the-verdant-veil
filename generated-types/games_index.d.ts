/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The GET /api/games payload
 */
interface GamesIndexJson {
  games: GameWithLimitedResources[]
  totalPages: number
}
/**
 * A version of a Game is in between a game without resources and a game with resources
 */
interface GameWithLimitedResources {
  createdAt: string
  currentlyPlaying: boolean
  cover: Cover
  estimatedFirstPlayedDate: string | null
  firstReleaseDate: string | null
  id: number
  igdbId: number
  lastPlayedDate: string | null
  name: string
  platforms: PlatformWithoutResources[]
  published: boolean
  slug: string
  /**
   * Float: the rating for the game from 1 - 5.
   */
  rating: number
  /**
   * Richtext: the review of the game.
   */
  review: string
  updatedAt: string
}
/**
 * A Cover.
 */
interface Cover {
  animated: boolean
  createdAt: string
  height: number
  id: number
  igdbId: number
  imageId: string
  updatedAt: string
  url: string
  width: number
}
/**
 * A version of a Platform that doesn't include relational resources.
 */
interface PlatformWithoutResources {
  /**
   * An abbreviated name for the platform.
   */
  abbreviation: string
  /**
   * An alternative name for the platform.
   */
  alternativeName: string
  createdAt: string
  generation: number | null
  id: number
  igdbId: number
  name: string
  slug: string
  /**
   * The summary of the first Version of this platform.
   */
  summary: string
  updatedAt: string
}
