import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../apis/userApi'

export interface userState {
  data?: {
    _id: string,
    name: string,
    email: string,
    role: string
  },
  token?: string
}

const initialState: userState = {
  data: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.user
      },
    )

    builder.addMatcher(
      userApi.endpoints.authUser.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data
      }
    )


    builder.addMatcher(
      userApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.data = undefined
      }
    )
  },
})
export default userSlice.reducer