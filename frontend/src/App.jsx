import React from 'react'
import { Route, Routes} from 'react-router'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/dashboard" element={<DashboardPage />}/>
       </Routes>
    </div>
  )
}

export default App