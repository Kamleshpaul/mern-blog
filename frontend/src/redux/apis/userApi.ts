import { ILoginPayload } from '@/validations/LoginValidator'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { IRegisterPayload } from '@/validations/RegisterValidator'


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

    register: builder.mutation({
      query: (data: IRegisterPayload) => ({
        url: "/auth/register",
        method: "post",
        data
      })
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
  useLogoutMutation,
  useRegisterMutation
} = userApi