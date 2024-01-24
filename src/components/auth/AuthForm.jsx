import styles from './AuthPage.module.css'
import { updateTokensData, setUserData } from '../../store/auth/authReducer';
import { useCheckUserMutation, useGetTokensMutation} from '../../store/api/api';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Cookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export function AuthForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid
    }
  } = useForm({
    mode: "onChange"
  });

  const cookies = new Cookies();
  const dispatch = useDispatch()
  const [error, setError] = useState('');

  const [ checkUserApi ] = useCheckUserMutation();
  const [ getToken ] = useGetTokensMutation();

  const setTokens = async (data) => {
    try {
      const useTokens = await getToken(data).unwrap()
      cookies.set('refresh', useTokens.refresh, {
        expires: new Date(jwtDecode(useTokens.refresh).exp*1000),
      });
      dispatch(updateTokensData({
        status: true,
        access: useTokens.access
      }))
    } catch {
      console.log('error token')
    }
  }

  const hundlerSubmit = async (data) => {
    setError('');
    try {
      const { result } = await checkUserApi(data).unwrap();
      cookies.set('isAdmin', result.is_staff);
      cookies.set('username', result.username);
      cookies.set('email', result.email);
      cookies.set('userId', result.id);
      dispatch(setUserData({
        isAdmin: result.is_staff,
        username: result.username,
        email: result.email,
        userId: result.id,
      }))
      await setTokens(data);
      reset();
    } catch (err) {
      setError(err.data.Error)
    }
  } 

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(hundlerSubmit)}>
      <label>
        Login
        <input {...register(
          'username', 
          {
            required: "The field must be filled in.",
            maxLength: {
            value: 20,
            message: 'Value too long!'
            },
            minLength: {
              value: 4,
              message: 'Value too short!'
            },
            pattern: {
              value: /^[a-z]{1}[a-z0-9]/i,
              message: 'The login must start with a letter and contain only Latin characters'
            }
          }
          )}/>
      </label>
      <label>
        Password 
        <input type='password' {...register('password',
          {
            required: "The field must be filled in.",
            minLength: {
              value: 6,
              message: 'Value too short!'
            },
            pattern: {
              value: /(?=.*[0-9])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*/i,
              message: 'The password must contain at least 6 characters, at least one capital letter, one digit and one special character.'
            }
          }
        )}/>
      </label>
      <div className={styles.errorMessage}>
        {errors.username? <span>{errors.username.message}</span> : null}
        {errors.password? <span>{errors.password.message}</span> : null}
        {error? <span>{error}</span> : null}
      </div>
      <input type='submit' disabled={!isValid}/>
    </form>
  )
}
