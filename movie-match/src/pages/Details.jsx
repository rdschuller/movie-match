import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getMovieData } from '../../api/TMDB'
import MovieInfo from "../components/MovieInfo";
 

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

        <div>
            <MovieInfo
                key={movie.id}
                movie={movie}

            />
        </div>
    )
}