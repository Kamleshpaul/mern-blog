import { toast } from "@/components/ui/use-toast"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"

export const axiosBaseQuery =
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