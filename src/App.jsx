import { Navbar, Home, Services, About, Contact } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/services' element={
          <>
            <Navbar />
            <Services />
          </>
        } />
        <Route path='/about' element={
          <>
            <Navbar />
            <About />
          </>
        } />
        <Route path='/contact' element={
          <>
            <Navbar />
            <Contact />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;