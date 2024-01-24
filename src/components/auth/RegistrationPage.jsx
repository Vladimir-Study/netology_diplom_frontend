import styles from './AuthPage.module.css'
import { CloudIcon } from '../icons/CloudIcon'
import { RegistrationForm } from './RegistrationForm'

export function RegistrationPage() {
  return (
    <div className={styles.authPage}>
      <CloudIcon/>
      <RegistrationForm/>
    </div>
  )
}
