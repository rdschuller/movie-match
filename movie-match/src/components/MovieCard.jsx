
import { Link } from 'react-router-dom'
import BlankPoster from '../assets/blank-poster.png'

export default function MovieCard(props) {
    
    const imageUrl = "https://image.tmdb.org/t/p/w400"
    return (
        <section className='flex flex-col w-64 m-10 text-xs grow-0 shrink-0 relative border-4 border-slate-700 rounded-xl bg-slate-600 drop-shadow-lg hover:border-slate-400'>
            <Link to={`/movie/${props.id}`}>
                {props.poster === null ? <img src={BlankPoster} className='rounded-t-md w-80 h-96' alt='Blank Movie Poster'/> : <img src={`${imageUrl}${props.poster}`} alt="movie poster" className='rounded-t-md'/>}
            </Link>
                <h2 className='p-1 text-xl font-oswald uppercase mb-4 mt-2'>{props.title}</h2>
                
        </section>
      
      
    )
  }
  