import { ILoginPayload } from '@/validations/LoginValidator'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
    credentials: "same-origin",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: ILoginPayload) => ({
        url: "/auth/login",
        method: "post",
        body
      }),
      // invalidatesTags: ["User"],
    }),
  })
})

export const { useLoginMutation } = api