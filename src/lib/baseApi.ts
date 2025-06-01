import axios from 'axios'

import { THE_VERDANT_VEIL_API_URL } from '@/constants/env'

export const baseApi = axios.create({
  baseURL: THE_VERDANT_VEIL_API_URL,
})

baseApi.defaults.headers.common['Accept'] = 'application/json'
baseApi.defaults.headers.common['Content-Type'] = 'application/json'
