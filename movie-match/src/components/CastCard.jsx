
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MovieFilterContext } from '../App' 


export default function CastCard({id, profile, name, character}) {
    
    const imageUrl = "https://image.tmdb.org/t/p/w400"
    const [filterTerms, setfilterTerms] = useContext(MovieFilterContext)

    
    return (


        <section className='flex flex-col w-64 m-10 text-xs grow-0 shrink-0 relative border-4 border-slate-700 rounded-xl bg-slate-600 hover:border-slate-400 drop-shadow-lg font-lato'>
            <Link
                key={id}
                onClick={() => setfilterTerms({ with_people: id })}
                to={'/'}
            >
    
                <img 
                    src={`${imageUrl}${profile}`} 
                    alt="Image of actor" 
                    className='rounded-t-lg'
                    />
                    
            </Link>
                <h1 className='text-lg text-white px-2 py-1'>{name}</h1>
                <h2 className='text-md text-slate-50 px-2 mb-1'>{character}</h2>
            
        </section>
      
      
    )
  }
  