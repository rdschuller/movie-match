import { useState, useEffect, useContext, createContext } from 'react'
import MovieCard from './components/MovieCard'
import { getPopularMovies } from '../api/TMDB'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

//import pages
import Details from '../src/pages/Details'
import Home from './pages/Home';

export const MovieSearchContext = createContext();

export default function App() {
  
  // const [popularMovies, setPopularMovies] = useState([]);
  const [searchTerms, setSearchTerms] =useState({});
  const location = useLocation();
  

  return (
    <MovieSearchContext.Provider value={[searchTerms, setSearchTerms]}>
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
  )
}
