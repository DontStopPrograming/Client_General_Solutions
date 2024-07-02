'./App.css'

/* The code snippet is importing specific components and modules from different files and libraries. */
import { Navbar, Home, Services, About, Contact } from './components'
// import { Animation } from '../src/components/Utils'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {




  return (

    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/home' element={<Home />}> </Route>
        <Route path='/services' element={<Services />}> </Route>
        <Route path='/about' element={<About />}> </Route>
        <Route path='/contact' element={<Contact />}> </Route>
      </Routes>
    </Router>


  )
}

export default App
