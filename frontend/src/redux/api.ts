import { ILoginPayload } from '@/validations/LoginValidator'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'


const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            ...headers,
            "content-type": "application/json",
          },
          withCredentials: true
        })
        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError

        if (err.code === "ERR_NETWORK") {
          toast({
            title: err.message,
            variant: 'destructive'
          })
        }

        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:4000/api',
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
} = api