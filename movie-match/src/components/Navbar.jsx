import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import { MovieFilterContext, MovieSearchContext, UserContext } from "../App";
import SearchBar from './SearchBar';
import UserAuth from './UserAuth';
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather'




import Popcorn from '../assets/popcorn.svg'


export default function Navbar() {

    const [filterTerms, setfilterTerms] = useContext(MovieFilterContext);
    const [searchTitle, setSearchTitle] = useContext(MovieSearchContext);
    const user = useContext(UserContext);
    const [displayLogin, setDisplayLogin] = useState(false);

    const logout = async () => {
        try {
            await signOut(auth);            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="bg-slate-900 p-6 flex justify-between items-center">
        
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
            <SearchBar/>
            <div>
                <AnimatePresence>
                    {displayLogin && (
                        <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                        >
                        <div className='relative'>
                            <UserAuth 
                                setDisplayLogin={setDisplayLogin}
                            />
                            <button 
                                onClick={() => setDisplayLogin(false)}
                                className="absolute top-2 right-2 rounded-md p-2"
                            ><X size={30} color='grey' className='hover:bg-gray-300'/></button>
                        </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* If user is not logged in display the login button */}
                {!user &&
                <button 
                    onClick={() => setDisplayLogin(true)}
                    className='bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mb-5 mx-auto inline-block w-auto text-white'
                >Login</button>
                }
                {/* If user is logged in display their name with link to profile and the logout button */}
                {user &&
                
                <div className='flex items-center'>
                    <button
                        onClick={() => logout()}
                        className='bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mx-auto inline-block w-auto text-white'
                    >
                        Logout
                    </button>
                    {/* Linking the user's name to their user page */}
                    <Link to={`/user/${user.displayName}`} className='font-oswald text-xl text-red-500 hover:text-red-600 active:text-red-700 mx-4'>
                        {user.displayName}
                    </Link>

                    {/* <h3 className='font-oswald text-xl text-red-500 hover:text-red-600 active:text-red-700 mx-4'>{user.displayName}</h3> */}
                </div>
                }
                
            </div>
        </nav>
    )
}

