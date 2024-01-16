// import { Dispatch } from "@reduxjs/toolkit";
// import { auth } from "../../../components";
import { login } from '../../components/auth'
import { loginStart, loginSuccess } from "./authReducer";

export const loginUser = (data) => async (dispatch) => {
  dispatch(loginStart())
  const res = await login(data)
  dispatch(loginSuccess(res.data.accessToken))
}