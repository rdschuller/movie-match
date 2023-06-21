import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getMovieData, getMovieCredits } from '../../api/TMDB'

//import components
import MovieInfo from "../components/MovieInfo";
import CastInfo from '../components/CastInfo'
import '../app.css'
import { motion } from 'framer-motion'


export default function Details() {

    const { id } = useParams(); 
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    
    //fetch detailed movie and cast descriptions from API
    useEffect(() => {
    const fetchMovie = async () => {
        const movieData = await getMovieData(id);
        setMovie(movieData);
        }

    const fetchMovieCast = async () => {
        const castData = await getMovieCredits(id);
        setCast(castData)
    }
    fetchMovie();
    fetchMovieCast();

    }, [id])

    return (
        
        <motion.div
            initial={{opacity: 1}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="py-6"
        >
            <MovieInfo
                key={movie.id}
                movie={movie}
            />
            <CastInfo
                key={cast.id}
                cast={cast.cast}
            />
            
        </motion.div>
)
}