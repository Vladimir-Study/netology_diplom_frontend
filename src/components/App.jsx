import { Route, Routes } from 'react-router-dom'

import { AuthPage } from './auth/AuthPage'
import { RegistrationPage } from './auth/RegistrationPage'
import { Main } from './Main' 
import { About } from './about/About'
import { Panel } from './adminer/panel/Panel'
import { Storage } from './filesStorage/storage/Storage'
import { AddFile } from './filesStorage/addFile/AddFile'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={< Main />}>
          <Route index element={< About />}/>
          <Route path='/login' element={< AuthPage />} />
          <Route path='/registration' element={< RegistrationPage />} />
          <Route path='/users' element={< Panel />}/>
          <Route path='/files' element={< Storage />}/>
          <Route path='/add-file' element={< AddFile />}/>
          <Route path='*' element={< About />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
