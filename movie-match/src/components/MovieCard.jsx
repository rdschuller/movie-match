
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { auth } from '../config/firebase'
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

//import assets
import BlankPoster from '../assets/blank-poster.png'
import EmptyHeart  from '../assets/empty-heart.svg'
import FilledHeart from '../assets/filled-heart.svg'


export default function MovieCard(props) {

    const user = useContext(UserContext)

    const [isHeartFull, setIsHeartFull] = useState(false)

    const getUserLovedMovies = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid)
        const userSnap = await getDoc(userRef)
        return userSnap.data().lovedMovies
    }

    //check if movie is in user's lovedMovies array while user is logged in
    useEffect(() => {
        if(user) {
            getUserLovedMovies().then((lovedMovies) => {
                if(lovedMovies.includes(props.id)) {
                    setIsHeartFull(true)
                } else {
                    setIsHeartFull(false)
                }
            })
        }

    }, [props.id, user])

    //togle between full and empty heart and read and write data to firebase
    const handleHeart = async () => {
        
        const userRef = doc(db, "users", auth.currentUser.uid);
        
        //if heart is empty then add movie to lovedMovies array
        if(isHeartFull) {
            setIsHeartFull(false)
            await updateDoc(userRef, {
                lovedMovies: arrayRemove(props.id)
            })
        } else {
            setIsHeartFull(true)
            await updateDoc(userRef, {
                lovedMovies: arrayUnion(props.id)
            })
        }
}
    const imageUrl = "https://image.tmdb.org/t/p/w400"
    return (
        <section className='flex flex-col w-64 m-10 text-xs grow-0 shrink-0 relative border-4 border-slate-700 rounded-xl bg-slate-600 drop-shadow-lg hover:border-slate-400'>
            <div>
                {/* if user is logged in then create possibility to favorite movies */}
                {user && 
                    <div className='absolute top-0 left-0 m-2' onClick={() => handleHeart()}>
                        <img 
                            src={isHeartFull ? FilledHeart : EmptyHeart} 
                            alt="heart icon" 
                            className='w-6'
                        />
                    </div>
                }
                <Link to={`/movie/${props.id}`}>
                    {props.poster === null ? <img src={BlankPoster} className='rounded-t-md w-80 h-96' alt='Blank Movie Poster'/> : <img src={`${imageUrl}${props.poster}`} alt="movie poster" className='rounded-t-md'/>}
                </Link>
            </div>
                <h2 className='p-1 text-xl font-oswald uppercase mb-4 mt-2'>{props.title}</h2>
                
        </section>
      
      
    )
  }
  