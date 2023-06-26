import { useState, useEffect, createContext } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

//import pages
import Details from '../src/pages/Details'
import Home from './pages/Home';

export const MovieFilterContext = createContext();
export const MovieSearchContext = createContext();

export default function App() {
  
  // const [popularMovies, setPopularMovies] = useState([]);
  const [filterTerms, setfilterTerms] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const location = useLocation();

  //Scroll to top of page upon changing routes
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);



  return (
    <MovieFilterContext.Provider value={[filterTerms, setfilterTerms]}>
    <MovieSearchContext.Provider value={[searchTitle, setSearchTitle]}>
    <div className='bg-slate-800 w-screen'>
      <Navbar />
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie/:id' element={<Details />}></Route>
      </Routes>
      </AnimatePresence>
    </div>
    </MovieSearchContext.Provider>
    </MovieFilterContext.Provider>
   
  )
}
