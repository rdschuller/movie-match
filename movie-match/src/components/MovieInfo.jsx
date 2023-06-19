
export default function MovieInfo({ movie }) {
    
    const imageUrl = "https://image.tmdb.org/t/p/w1280"

    if (!movie || !movie.genres) {
        return <div>Loading...</div>;
    }
    //Format release date to more readable string
    const date = new Date(movie.release_date);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
      <section className="lg:grid lg:grid-cols-3 border-2 border-solid rounded-lg border-white m-4">
        <div className="lg:col-span-2">
            <h1 className="font-oswald text-4xl text-red-600 font-semibold text-center py-6">{movie.title}</h1>
            <img 
                src={`${imageUrl}${movie.backdrop_path}`} 
                alt="Movie Backdrop"
                className="p-4"
            />
            <blockquote className="font-oswald font-semibold text-red-400 text-xl  text-center">{movie.tagline}</blockquote>
            <p className="p-4 font-lato text-lg text-white">{movie.overview}</p>
        </div>
       <div>
        <div className="font-lato text-lg text-white lg:col-span-1 lg:mt-24">
                <div>
                    <div className="flex justify-between px-5 mb-4">
                        <h3 className="font-semibold">Release Date</h3>
                        <p>{formattedDate}</p>     
                    </div>
                    
                    <div className="flex justify-between px-5 mb-4">
                        <h3 className="font-semibold">Budget</h3>
                        <p>{movie.budget > 0 ?`${movie.budget}$`: "Unknown"}</p>
                    </div>
                    
                    <div className="flex justify-between px-5 mb-4">
                        <h3 className="font-semibold">Genres</h3>
                        <div className="flex flex-col text-right">
                            {movie.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
                        </div>    
                    </div>
                    {movie.production_countries.length >= 1 && 
                    (<div className="flex justify-between px-5 mb-4">
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
                    </div>)}
                    

                    <div className="flex justify-between px-5 mb-4">
                        <h3 className="font-semibold">{ movie.production_companies.length > 1 ? "Production Companies": "Production Companies"}</h3>
                        <div className="flex flex-col py-4">
                            {/* {source: "https://flagsapi.com/"} */}
                            {movie.production_companies.map((company) => {
                                if (company.logo_path) {
                                    return (
                                        <div 
                                            key={company.id}
                                            className="w-20 bg-white my-1 p-1"
                                        >
                                            <img 
                                                src={`${imageUrl}${company.logo_path}`}
                                                alt={company.name}
                                            />
                                        </div>
                                        )
                                 }
                            }           
                         )}
                        </div>    
                    </div>
                </div>
            </div>
       </div>
        
        

      </section>
       
      
    )
  }
  