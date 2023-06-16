import { useState, useEffect, useContext, createContext } from 'react'
import MovieCard from './components/MovieCard'
import { getPopularMovies } from '../api/TMDB'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Details from '../src/pages/Details'

export default function App() {
  
  const [popularMovies, setPopularMovies] = useState([]);
  const MovieContext = createContext()

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
      title={movie.original_title}
      poster={movie.poster_path}
      genre={movie.genres}
    />
  })

  return (
    <div className='bg-slate-800'>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
            {popularMovies.length > 0 && movieList}
          </section>
        }>
        </Route>
        <Route path='/movie/:id' element={<Details />}>
        </Route>
      

      </Routes>
    </div>
  )
}
