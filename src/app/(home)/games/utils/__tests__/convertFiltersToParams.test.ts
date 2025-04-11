import { SyntheticEvent } from 'react'

import { convertFiltersToParams } from '..'

const form = document.createElement('form')
const companyOne = document.createElement('input')
companyOne.checked = true
companyOne.name = 'companies'
companyOne.value = '1'
form.append(companyOne)

const companyTwo = document.createElement('input')
companyTwo.checked = true
companyTwo.name = 'companies'
companyTwo.value = '2'
form.append(companyTwo)

const genreOne = document.createElement('input')
genreOne.checked = true
genreOne.name = 'genres'
genreOne.value = '1'
form.append(genreOne)

const platformOne = document.createElement('input')
platformOne.checked = true
platformOne.name = 'platforms'
platformOne.value = '1'
form.append(platformOne)

const event = {
  target: form,
} as unknown as SyntheticEvent<HTMLFormElement>

describe('convertFiltersToParams', () => {
  it('should convert form data to search params', () => {
    const searchParams = new URLSearchParams(
      'page=2&query=zelda&companies%5B%5D=4&companies%5B%5D=5&genres%5B%5D=4&genres%5B%5D=5&platforms%5B%5D=4&platforms%5B%5D=5',
    )
    const result = convertFiltersToParams(event, searchParams)
    const expectedSearchParams = new URLSearchParams(
      'query=zelda&companies[]=1&companies[]=2&genres[]=1&platforms[]=1',
    )
    expect(result).toEqual(String(expectedSearchParams))
  })
})
