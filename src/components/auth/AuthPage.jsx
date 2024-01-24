import React from 'react'
import styles from './AuthPage.module.css'
import { CloudIcon } from '../icons/CloudIcon'
import { AuthForm } from './AuthForm'

export function AuthPage() {
  return (
    <div className={styles.authPage}>
      <CloudIcon/>
      <AuthForm/>
    </div>
  )
}
