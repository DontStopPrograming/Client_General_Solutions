'./App.css'
import { Navbar, Home, About } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/home' element={<Home />}> </Route>
          <Route path='/about' element={<About />}> </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App


