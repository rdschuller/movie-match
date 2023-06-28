import { useState, useEffect, useContext, createContext } from 'react'
import { discoverMovies, getGenres, searchMovies } from '../../api/TMDB'
import { motion } from 'framer-motion'
import { MovieFilterContext, MovieSearchContext } from '../App'

//import components to build page
import MovieCard from '../components/MovieCard'
import Toolbox from '../components/Toolbox'

export default function Home() {
  
  const [movieGrid, setmovieGrid] = useState([]);
  const [page, setPage] = useState(1);

  const [filterTerms, setfilterTerms] = useContext(MovieFilterContext);
  const [searchTitle, setSearchTitle] = useContext(MovieSearchContext);

  //fetch the initial movies, only runs on first page load
  useEffect(() => {
    const fetchInitialMovies = async () => {
        const movies = await discoverMovies(filterTerms, 1);
        setmovieGrid(movies);
    }
    fetchInitialMovies();
    

}, [filterTerms]);

//search movies if requested through navbar
useEffect(() => {
    const search = async () => {
        const movies = await searchMovies(searchTitle, 1);
        setmovieGrid(movies);
    }
    search();
    

}, [searchTitle]);

    //fetch more movies everytime searchTerm changes or more pages are loaded
    useEffect(() => {
        const fetchMovies = async () => {
            if (page > 1) {
                if(searchTitle) {
                    const movies = await searchMovies(searchTitle, page);
                    setmovieGrid(prevMovies => [...prevMovies, ...movies]);
                    console.log("more than one page with title" + searchTitle) 
                }
                else{
                    const movies = await discoverMovies(filterTerms, page);
                    setmovieGrid(prevMovies => [...prevMovies, ...movies]);
                }
            }
        }
        fetchMovies();
    }, [page, filterTerms, searchTitle]);
  

  const movieList = movieGrid.map(movie => {
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
        <Toolbox />
        <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2' >
            {movieGrid.length > 0 && movieList}
        </section>
        {movieGrid.length === 0 && <h1 className='font-oswald text-5xl self-center text-white p-7'>No Movies Found</h1>}
        {/* check that movies left are less than 20 and if so do not display button to call for more movies */}
        {movieGrid.length % 20 === 0 &&
        <button onClick={() => setPage(page + 1)}
            className='bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mb-5 mx-auto inline-block w-auto text-white'
        >
            More Movies...
        </button>
        }    
    </motion.div>
  )
}
