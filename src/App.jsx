'./App.css'

/* The code snippet is importing specific components and modules from different files and libraries. */
import { Navbar, Home, About, Services } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/home' element={<Home />}> </Route>
          <Route path='/services' element={<Services />}> </Route>
          <Route path='/about' element={<About />}> </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App


