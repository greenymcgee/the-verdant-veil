export function getParamsWithoutFilters(searchParams: URLSearchParams) {
  searchParams.delete('companies[]')
  searchParams.delete('genres[]')
  searchParams.delete('platforms[]')
  return String(searchParams)
}
