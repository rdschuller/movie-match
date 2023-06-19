import { useState, useEffect, useContext, createContext } from 'react'
import MovieCard from './components/MovieCard'
import { getPopularMovies } from '../api/TMDB'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Details from '../src/pages/Details'

export default function App() {
  
  const [popularMovies, setPopularMovies] = useState([]);
  const MovieContext = createContext();
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getPopularMovies()
      setPopularMovies(movies)
    }
    fetchMovies();
    
  }, [])
  

  const movieList = popularMovies.map(movie => {
    return <MovieCard 
      key={movie.id}
      id={movie.id}
      title={movie.title}
      poster={movie.poster_path}
      genre={movie.genres}
    />
  })

  return (
    <div className='bg-slate-800'>
      <Navbar />
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={
          <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
            {popularMovies.length > 0 && movieList}
          </section>
        }>
        </Route>
        <Route path='/movie/:id' element={<Details />}>
        </Route>
      </Routes>
      </AnimatePresence>
    </div>
  )
}
