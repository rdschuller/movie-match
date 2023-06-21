import { Link } from 'react-router-dom'


import Popcorn from '../assets/popcorn.svg'


export default function Navbar() {


    return (
        <nav className="bg-slate-900 p-6 flex items-center">
            <img src={Popcorn} alt="Popcorn logo" className='w-10 px-1' />
            <Link to={`/`}>
                <h1 className="text-4xl font-oswald font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">MovieMatch</h1>
            </Link>
        </nav>
    )
}