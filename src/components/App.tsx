import './App.css'
import { AuthForm } from './auth/AuthForm'
import { CloudIcon } from './icons/CloudIcon'

function App() {

  // const { data, error, isLoading} = api.useGetUsersQuery()
  // console.log(data, error, isLoading)

  return (
    <>
      <CloudIcon/>
      <AuthForm/>
    </>
  )
}

export default App
