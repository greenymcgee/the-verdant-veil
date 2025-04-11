export function filtersPresent(searchParams: URLSearchParams) {
  return (
    searchParams.has('companies[]') ||
    searchParams.has('genres[]') ||
    searchParams.has('platforms[]')
  )
}
