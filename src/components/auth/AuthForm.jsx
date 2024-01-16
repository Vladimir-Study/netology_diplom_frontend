import React, { useState } from 'react'
import styles from './AuthFrom.module.css'
import { updateData } from '../../store/auth/authReducer';
import { useAddUsersMutation, useCheckUserMutation, useGetTokensMutation } from '../../store/api/api';
import { useDispatch, useSelector } from 'react-redux';

export function AuthForm() {

  // const tokens = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const defaultData = {
    username: '',
    password: ''
  }

  const [userData, setUserData] = useState(defaultData);
  const [ checkUserApi, { isError }] = useCheckUserMutation();
  const [ getToken ] = useGetTokensMutation();
  const [ addUser, { isSuccess } ] = useAddUsersMutation();

  const getTokens = async () => {
      const useTokens = await getToken(userData).unwrap()
      dispatch(updateData({
        status: true,
        access: useTokens.access,
        refresh: useTokens.refresh
      }))
  }

  const hundlerSubmit = async (e) => {
    e.preventDefault()
    await checkUserApi(userData).unwrap()
    if (!isError) {
      getTokens();
    }
  } 

  const hundlerClick = async () => {
    await addUser(userData).unwrap()
    if (isSuccess) {
      getTokens();
    }
  }

  return (
    <form className={styles.authForm} onSubmit={hundlerSubmit}>
      <label htmlFor="login">Login</label>
      <input type="text" 
      id="login" 
      name="login" 
      value={userData.username} 
      style={isError ? {outline: 'none', border: '1px solid red', borderRadius: '0.2rem'} : null}
      onChange={e => setUserData({
        ...userData,
        username: e.target.value
      })}/>
      <label htmlFor="password">Password</label>
      <input type="password" 
      id='password' 
      name='passowrd' 
      style={isError ? {outline: 'none', border: '1px solid red', borderRadius: '0.2rem'} : null}
      value={userData.password}
      onChange={e => setUserData({
        ...userData,
        password: e.target.value
      })}
      />
      <button type='submit'>Войти</button>
      <button type='button' onClick={hundlerClick}>Зарегестироваться</button>
    </form>
  )
}
