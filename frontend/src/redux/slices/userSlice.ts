import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../apis/userApi'

export interface userState {
  user?: {
    name: string,
    email: string
  },
  token?: string
}

const initialState: userState = {
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
      },
    )

    builder.addMatcher(
      userApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.user = undefined
      }
    )
  },
})
export default userSlice.reducer