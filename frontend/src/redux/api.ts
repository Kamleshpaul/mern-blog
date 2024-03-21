import { ILoginPayload } from '@/validations/LoginValidator'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'


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
        console.log({ url, method, data, params, headers });

        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            ...headers,
            "content-type": "application/json"
          },
        })
        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError
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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginPayload) => ({
        url: "/auth/login",
        method: "post",
        body: data
      }),
      // invalidatesTags: ["User"],
    }),
  })
})

export const { useLoginMutation } = api