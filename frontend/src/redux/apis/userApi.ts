import { ILoginPayload } from '@/validations/LoginValidator'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({


    authUser: builder.query({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['User']
    }),

    login: builder.mutation({
      query: (data: ILoginPayload) => ({
        url: "/auth/login",
        method: "post",
        data
      }),
      invalidatesTags: ["User"],
    }),


    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "post",
        data: {},
      }),
      invalidatesTags: ["User"],
    }),

  })
})

export const {
  useLoginMutation,
  useAuthUserQuery,
  useLogoutMutation
} = userApi