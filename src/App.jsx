import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Project from './pages/Project'
import { ProjectProvider } from './Context/ProjectProvier'
import ProjectDetails from './pages/ProjectDetails'
import TaskDetails from './pages/TaskDetails'

function App() {
  return (
    <>
      <ProjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='User' element={<User/>}/>
            <Route path='Project' element={<Project/>}/>
            <Route path='Project/:id' element={<ProjectDetails/>}/>
            <Route path="/project/:id/task/:taskId" element={<TaskDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ProjectProvider>
    </>
  )
}

export default App
