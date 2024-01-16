import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_API_URL = "http://127.0.0.1:8000/api/v1/"
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth
      if (token.token) {
        headers.set('authorization', `Bearer ${token.tokenData.access}`)
        console.log(token)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getTokens: builder.mutation({
      query: (body) => ({
        url: 'token',
        method: 'POST',
        body
      })
    }),
    addUsers: builder.mutation({
      query: (body) => ({
        url: 'user/',
        method: 'POST',
        body
      })
    }),
    checkUser: builder.mutation({
      query: (body) => ({
        url: 'check_user',
        method: 'POST',
        body
      })
    })
  }),
})

export const { useGetTokensMutation, useAddUsersMutation, useCheckUserMutation } = api