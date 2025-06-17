import React from 'react'
import { Route, Routes} from 'react-router'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/register" element={<RegisterPage />}/>
       </Routes>
    </div>
  )
}

export default App