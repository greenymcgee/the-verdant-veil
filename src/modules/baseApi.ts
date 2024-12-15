import axios from 'axios'

import { GREEN_QUEST_API_URL } from '@/constants/env'

export const baseApi = axios.create({
  baseURL: GREEN_QUEST_API_URL,
})

baseApi.defaults.headers.common['Accept'] = 'application/json'
baseApi.defaults.headers.common['Content-Type'] = 'application/json'
