import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { db } from '../config/firebase'
import { auth } from '../config/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { getMovieData } from '../../api/TMDB'
import MovieCard from '../components/MovieCard'

function UserPage() {
    // Extract user object from context
    const user = useContext(UserContext);

    
    // array to store a users loved movies
    const [lovedMovies, setLovedMovies] = useState([]);
    const [lovedMovieGrid, setLovedMovieGrid] = useState([]);

    const getUserLovedMovies = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid)
        const userSnap = await getDoc(userRef)
        return userSnap.data().lovedMovies
    }

    // check if movie is in user's lovedMovies array while user is logged in
    useEffect(() => {
        if(user) {
            getUserLovedMovies().then((lovedMovies) => {
                setLovedMovies(lovedMovies)
                console.log(lovedMovies)
            })
        }
    }, [user])

    // fetch movies from TMDB API based on lovedMovies array
    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await Promise.all(lovedMovies.map(async (movieID) => {
                const movie = await getMovieData(movieID)
                return movie
            }))
            setLovedMovieGrid(movies)
            console.log(movies);
        }
        fetchMovies()
    }, [lovedMovies])

    // if user is not logged in or data is still being fetched, show a loading state
    if (!user) {
        return <div>Loading user data...</div>; // Show a loading state or a message
    }


    const movieList = lovedMovieGrid.map(movie => {
        return (
            <MovieCard 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            genre={movie.genres}
            />
       
      )})

    // things availalbe from the user object
    // displayName, email, emailVerified, photoURL, uid

    return (
        <div className='text-white'>
            <h1 className='font-oswald text-3xl text-red-500'>{user.displayName}</h1>
            <h2 className="font-oswald text-white font-semibold text-2xl px-3">Loved Moves</h2>
            <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2' >
            {lovedMovieGrid.length > 0 && movieList}
            </section>
        </div>
    );
}

export default UserPage;