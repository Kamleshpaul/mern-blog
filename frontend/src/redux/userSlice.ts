import { createSlice } from '@reduxjs/toolkit'
import { api } from './api'

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
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log({ payload });

        state.user = payload.user

        throw Error("Example error in addMatcher")
      },
    )
  },
})

// export const {  } = userSlice.actions

export default userSlice.reducer