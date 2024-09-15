import { useState } from 'react'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Signup from './pages/Signup'
import SignIn from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Details from './pages/Details'
import Search from './pages/Search'
import Request from './pages/Request'
import Myself from './pages/myself'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/details" element={<Details/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/request" element={<Request/>}></Route>
        <Route path="/myself" element={<Myself/>}></Route>
        
      
      </Routes>
    </Router>
    </>
  )
}

export default App
