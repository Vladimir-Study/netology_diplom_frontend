import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  tokenData: {
    access: '',
    refresh: ''
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateData: (state, action) => {
      return {
        ...state,
        token: action.payload.status,
        tokenData: {
          access: action.payload.access,
          refresh: action.payload.refresh, 
        }
      }
    }
  }
})

export const { updateData } = authReducer.actions
export default authReducer.reducer;