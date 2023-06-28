import { Link } from 'react-router-dom'
import { useContext } from "react";
import { MovieFilterContext, MovieSearchContext } from "../App";
import SearchBar from './SearchBar';



import Popcorn from '../assets/popcorn.svg'


export default function Navbar() {

    const [filterTerms, setfilterTerms] = useContext(MovieFilterContext);
    const [searchTitle, setSearchTitle] = useContext(MovieSearchContext);

    return (
        <nav className="bg-slate-900 p-6 flex justify-between">
        
            <Link onClick={() => {
                setfilterTerms({});
                setSearchTitle("");
            }}
            to={`/`} className='flex items-center'>
                <img src={Popcorn} alt="Popcorn logo" className='w-10 px-1' />
                <h1 
                    className="text-4xl font-oswald font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 opacity-80 hover:opacity-100"
                >
                        MovieMatch
                </h1>
            </Link>
            <div>
            <SearchBar/>
            </div>
        </nav>
    )
}