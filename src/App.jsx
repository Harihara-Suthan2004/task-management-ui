import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Project from './pages/Project'
import { ProjectProvider } from './Context/ProjectProvier'
import ProjectDetails from './pages/ProjectDetails'
import TaskDetails from './pages/TaskDetails'
import { UserProvider } from './Context/UserProvider'
import UserDetail from './pages/UserDetail'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <ProjectProvider>
        <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='User' element={<User/>}/>
            <Route path='User/:id' element={<UserDetail/>}/>
            <Route path='Project' element={<Project/>}/>

            <Route path='Project/:id' element={<ProjectDetails/>}/>
            <Route path="/project/:id/task/:taskId" element={<TaskDetails />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
      </ProjectProvider>
    </>
  )
}

export default App
