import axios from "axios";

const API_KEY= import.meta.env.VITE_TMDB_KEY
const base_url = 'https://api.themoviedb.org/3';


export async function getPopularMovies() {
    try {
      const response = await axios.get(`${base_url}/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });
  
      const movies = response.data.results;
      const detailedMovies = await getMoviesData(movies); // Use getMovieData to get detailed movie data
  
      return detailedMovies;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function discoverMovies(searchTerms, pageNum) {
    try {
        const response = await axios.get(`${base_url}/discover/movie?`, {
          params: {
            api_key: API_KEY,
            page: pageNum,
            ...searchTerms
          },
        });
    
        const movies = response.data.results;
        const detailedMovies = await getMoviesData(movies); // Use getMovieData to get detailed movie data
    
        return detailedMovies;
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export async function getMoviesData(movies) {
    try {
      const moviePromises = movies.map(async (movie) => {
        try {
          const response = await axios.get(`${base_url}/movie/${movie.id}`, {
            params: {
                api_key: API_KEY,
            }
          });
          return response.data; // Return the movie data instead of the entire response object
        } catch (error) {
          return error.response.data; // Return the error data instead of the entire error response
        }
      });
  
      const movieData = await Promise.all(moviePromises);
      return movieData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

export async function getMovieData(id) {
    try {
        const response = await axios.get(`${base_url}/movie/${id}`, {
          params: {
              api_key: API_KEY,
          }
        });
        return response.data; // Return the movie data instead of the entire response object
      } catch (error) {
        return error.response.data; // Return the error data instead of the entire error response
      }
  }

  export async function getMovieCredits(id) {
    try {
        const response = await axios.get(`${base_url}/movie/${id}/credits`, {
          params: {
              api_key: API_KEY,
          }
        });
        return response.data; // Return the movie data instead of the entire response object
      } catch (error) {
        return error.response.data; // Return the error data instead of the entire error response
      }
  }
  

export async function getGenres() {
    try {
        const response = await axios.get(`${base_url}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
            },
        });
        const data = response.data
        return data.genres;

    } catch (error) {
        return error.response;
    }
}