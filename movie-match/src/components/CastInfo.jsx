//import dependencies
import { useContext, useState } from "react";
import { MovieSearchContext } from '../App' 
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight} from 'react-feather'


//import components
import CastCard from "./CastCard";

export default function Cast({ cast }) {
    
    const [curr, setCurr] = useState(0);
    

    const castList = cast && cast.map((actor) => (
        
            <CastCard
                key={actor.id}
                id={actor.id}
                name={actor.name}
                profile={actor.profile_path}
                character={actor.character}
            />
       
    ))

    // To-do fix carousel logic so that it is not possible to keep scrolling past the end the castList

    const prev = () => {
        if(curr > 0) setCurr(curr - 1); // Only decrease if not at beginning
    }
    const next = () => {
        if(curr < castList.length - 1) setCurr(curr + 1); // Only increase if not at end
    }
    

    return(
        
        <div className=" relative">
            <div 
                className="flex transition-transform ease-out duration-500 "
                style={{transform: `translateX(-${curr * 100}%)`}}
                onClick={console.log("something happened")}
                
            >
                {castList}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4" style={{pointerEvents: "none"}}>
                <button 
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-700 hover:opacity-100"
                    onClick={prev}
                    disabled={curr === 0} // Disable if at beginning
                    style={{pointerEvents: "auto"}}


                >
                    <ChevronLeft size={40}/>
                </button>
                <button 
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-700 hover:opacity-100"
                    onClick={next}
                    disabled={castList && curr === castList.length - 1} // Disable if at end
                    style={{pointerEvents: "auto"}}

                >
                    <ChevronRight size={40}/>
                </button>
            </div>
        </div>
        
    )
}