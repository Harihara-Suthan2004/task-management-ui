import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Project from './pages/Project'
import { ProjectProvider } from './Context/ProjectProvier'
import { UserProvider } from './Context/UserProvider'
import UserDetail from './pages/UserDetail' 


function App() {
  return (
    <div>
      <ProjectProvider>
        <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='User' element={<User/>}/>
            <Route path='User/:id' element={<UserDetail/>}/>
            <Route path='Project' element={<Project/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
      </ProjectProvider>
    </div>
  )
}

export default App
