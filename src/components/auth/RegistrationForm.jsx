import styles from './AuthPage.module.css'
import { useAddUsersMutation, useGetTokensMutation } from '../../store/api/api';
import { useForm } from 'react-hook-form'; 
import { Cookies } from 'react-cookie';
import { useState } from 'react';

export function RegistrationForm() {

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

  const [ getToken ] = useGetTokensMutation();
  const [ addUser, ] = useAddUsersMutation();
  const { VITE_ADMIN_PASSWORD } = import.meta.env;

  const [error, setError] = useState('');

  const getTokens = async (data) => {
    try {
      const useTokens = await getToken(data).unwrap();
      cookies.set('refresh', useTokens.refresh);
    } catch {
      console.log('error token')
    }
  }

  const hundlerSubmit = async (data) => {
    setError('')
    const body = ({
      ...data,
      is_staff: data.is_staff===VITE_ADMIN_PASSWORD?true:false,
    })
    try {
      await addUser(body).unwrap()
      await getTokens(body);
      reset
    } catch (err) {
      setError(err.data.username[0])
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
      <label>
        Email 
        <input {...register('email',
          {
            required: "The field must be filled in.",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              message: 'This value not email'
            }
          }
        )}/>
      </label>
      <label>
        Full Name 
        <input {...register('fullName')}/>
      </label>
      <label>
        Admin 
        <input placeholder='Inpu your code' {...register('is_staff')}/>
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
