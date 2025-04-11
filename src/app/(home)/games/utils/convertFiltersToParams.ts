import { SyntheticEvent } from 'react'

function deletePreviousFilters(searchParams: URLSearchParams) {
  searchParams.delete('page')
  searchParams.delete('companies[]')
  searchParams.delete('genres[]')
  searchParams.delete('platforms[]')
}

function addCompanyFilters(searchParams: URLSearchParams, formData: FormData) {
  const companies = formData.getAll('companies')
  companies.forEach((id) => searchParams.append('companies[]', id.toString()))
}

function addGenreFilters(searchParams: URLSearchParams, formData: FormData) {
  const genres = formData.getAll('genres')
  genres.forEach((id) => searchParams.append('genres[]', id.toString()))
}

function addPlatformFilters(searchParams: URLSearchParams, formData: FormData) {
  const platforms = formData.getAll('platforms')
  platforms.forEach((id) => searchParams.append('platforms[]', id.toString()))
}

export function convertFiltersToParams(
  event: SyntheticEvent<HTMLFormElement>,
  searchParams: URLSearchParams,
) {
  const formData = new FormData(event.target as HTMLFormElement)
  deletePreviousFilters(searchParams)
  addCompanyFilters(searchParams, formData)
  addGenreFilters(searchParams, formData)
  addPlatformFilters(searchParams, formData)
  return String(searchParams)
}
