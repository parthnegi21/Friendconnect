import { useState } from 'react'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Signup from './pages/Signup'
import SignIn from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Post from './pages/Post'
import Search from './pages/Search'
import Request from './pages/Request'
import Myself from './pages/myself'

import Friends from './pages/Friends';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/request" element={<Request/>}></Route>
        <Route path="/myself" element={<Myself/>}></Route>
        
        <Route path="/friends" element={<Friends/>}></Route>
        
      
      </Routes>
    </Router>
    </>
  )
}

export default App
