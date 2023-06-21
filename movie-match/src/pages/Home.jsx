import { useState, useEffect, useContext, createContext } from 'react'
import MovieCard from '../components/MovieCard'
import { getPopularMovies, discoverMovies } from '../../api/TMDB'
import { motion } from 'framer-motion'
import { MovieSearchContext } from '../App'

export default function Home() {
  
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [searchTerms, setSearchTerms] = useContext(MovieSearchContext)

  //fetch the initial movies, only runs on first page load
  useEffect(() => {
    const fetchInitialMovies = async () => {
        const movies = await discoverMovies(searchTerms, 1);
        setPopularMovies(movies);
    }
    fetchInitialMovies();
}, []);

    //fetch more movies everytime searchTerm changes or more pages are loaded
    useEffect(() => {
        const fetchMovies = async () => {
            if (page > 1) {
                const movies = await discoverMovies(searchTerms, page);
                setPopularMovies(prevMovies => [...prevMovies, ...movies]);
            }
        }
        fetchMovies();
    }, [page, searchTerms]);
  

  const movieList = popularMovies.map(movie => {
    return (
        <MovieCard 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster={movie.poster_path}
        genre={movie.genres}
        />
   
  )})
  

  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className='flex flex-col '
    >
        <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2' layout>
            {popularMovies.length > 0 && movieList}
        </section>
        <button onClick={() => setPage(page + 1)}
            className='bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mb-5 mx-auto inline-block w-auto'
        >
            More Movies...
        </button>
            
    </motion.div>
  )
}
