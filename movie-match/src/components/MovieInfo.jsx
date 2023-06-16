
export default function MovieInfo({ movie }) {
    
    const imageUrl = "https://image.tmdb.org/t/p/w1280"
    
    if (!movie || !movie.genres) {
        return <div>Loading...</div>;
    }
    return (
      <section >
        <h1 className="font-oswald text-4xl text-red-600 font-semibold text-center py-6">{movie.original_title}</h1>
        <img 
            src={`${imageUrl}${movie.backdrop_path}`} 
            alt="Movie Backdrop"
            className="p-4"
         />
         <blockquote className="font-oswald font-semibold text-red-400 text-xl  text-center">{movie.tagline}</blockquote>
        <div className="font-lato text-lg text-white">
            <p className="p-4">{movie.overview}</p>
            <div>
                <div className="flex justify-between px-5 mb-4">
                    <h3 className="font-semibold">Release Date</h3>
                    <p>{movie.release_date}</p>     
                </div>
                
                <div className="flex justify-between px-5 mb-4">
                    <h3 className="font-semibold">Budget</h3>
                    <p>{movie.budget > 0 ?`${movie.budget}$`: "Unknown"}</p>
                </div>
                
                <div className="flex justify-between px-5 mb-4">
                    <h3 className="font-semibold">Genres</h3>
                    <div className="flex flex-col">
                        {movie.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
                    </div>    
                </div>

                <div className="flex justify-between px-5 mb-4">
                    <h3 className="font-semibold">{ movie.production_countries.length > 1 ? "Production Countries": "Production Country"}</h3>
                    <div className="flex flex-col">
                        {/* {source: "https://flagsapi.com/"} */}
                        {movie.production_countries.map((country) => 
                            <img 
                                key={country.id} 
                                src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`} 
                                alt={country.name}
                             />)}
                    </div>    
                </div>

            </div>
            
        </div>
        

      </section>
       
      
    )
  }
  