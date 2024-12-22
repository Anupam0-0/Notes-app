import React from 'react'
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp.jsx'
import Navbar from './components/Navbar.jsx'

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />

    </Routes>
  </Router>
)



const App = () => {
  return (
    <div>
      
      {routes}

    </div>
  )
}

export default App