/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The GET /api/release_dates payload
 */
interface ReleaseDatesIndexJson {
  releaseDates: ReleaseDate[]
}
/**
 * A ReleaseDate.
 */
interface ReleaseDate {
  createdAt: string
  /**
   * The date of the release.
   */
  date: string | null
  /**
   * A human readable representation of the date.
   */
  humanReadable: string
  id: number
  igdbId: number
  /**
   * The month as an integer starting at 1 (January).
   */
  month: number | null
  platformName: string
  updatedAt: string
  /**
   * The year in full (2018).
   */
  year: number | null
}
