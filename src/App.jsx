import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Project from './pages/Project'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='User' element={<User/>}/>
            <Route path='Project' element={<Project/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
