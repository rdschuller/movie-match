import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getMovieData, getMovieCredits } from '../../api/TMDB'
import MovieInfo from "../components/MovieInfo";
import '../app.css'
import { motion } from 'framer-motion'


export default function Details() {

    const { id } = useParams(); 
    const [movie, setMovie] = useState([])
    
    
    useEffect(() => {
    const fetchMovie = async () => {
        const movieData = await getMovieData(id)
        setMovie(movieData)
        }
        fetchMovie();

    }, [id])

    return (
        
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
        >
            <MovieInfo
                key={movie.id}
                movie={movie}

            />
        </motion.div>
)
}