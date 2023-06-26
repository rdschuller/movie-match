import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { MovieFilterContext } from "../App";
import { getGenres } from '../../api/TMDB'
import { AlignRight } from 'react-feather'
import { CSSTransition } from 'react-transition-group';
import '../app.css'



export default function Toolbox() {
    const { control, handleSubmit } = useForm();
    const [filterTerms, setfilterTerms] = useContext(MovieFilterContext);
    const [genres, setGenres] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
  
    const onSubmit = (data) => {
      setfilterTerms({
        "primary_release_date.gte": data.startDate,
        "primary_release_date.lte": data.endDate,
        "with_genres": data.genre
      });
    };
  
    useEffect(() => {
      const fetchGenres = async () => {
        const genres = await getGenres();
        setGenres(genres);
      };
  
      fetchGenres();
    }, []);
  
    return (
      <div className="text-xl font-lato">
        <div className="flex justify-end items-center px-3">
          <h3 className="font-oswald text-white font-semibold text-2xl px-3">Filter Movies</h3>
          <button onClick={() => setShowFilter(!showFilter)} className="hover:scale-105">
            <AlignRight size={40} color="red" />
          </button>
        </div>
        <CSSTransition
          in={showFilter}
          timeout={400}
          classNames="filter"
          unmountOnExit
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col border-slate-700 border-4 p-4 transform m-4"
          >
            <h3 className="font-oswald text-white font-semibold text-2xl">Filter Movies</h3>
            <div>
              <h3 className="text-white">Start Date</h3>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showYearDropdown
                    yearDropdownItemNumber={10}
                    dropdownMode="select"
                    minDate={new Date("1910/01/01")}
                    maxDate={new Date()}
                    className="text-black"
                  />
                )}
              />
            </div>
            <div>
              <h3 className="text-white">End Date</h3>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showYearDropdown
                    yearDropdownItemNumber={10}
                    dropdownMode="select"
                    minDate={new Date("1910/01/01")}
                    maxDate={new Date()}
                    className="text-black"
                  />
                )}
              />
            </div>
            <div>
              <h3 className="text-white">Genre</h3>
              <Controller
                control={control}
                name="genre"
                className="rounded-3xl"
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 px-6 py-3 rounded-md mb-5 mx-auto inline-block w-auto my-4"
            >
              Search
            </button>
          </form>
        </CSSTransition>
      </div>
    );
  }