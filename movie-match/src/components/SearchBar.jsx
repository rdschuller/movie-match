import { useForm } from "react-hook-form";
import { useContext } from "react";
import { MovieSearchContext } from "../App";

export default function SearchBar() {
  const { control, handleSubmit, register, reset } = useForm();
  const [searchTitle, setSearchTitle] = useContext(MovieSearchContext);

  const onSubmit = (data) => {
    setSearchTitle(data.searchQuery);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center font-lato">
      <input
        type="text"
        name="searchQuery"
        autoComplete="off"
        placeholder="Search for movies"
        className="border border-red-300 px-3 py-2 rounded-l-md focus:outline-none outline-none focus:ring focus:border-red-500"
        {...register("searchQuery", { required: true })}
      />
      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-r-md ml-2">
        Search
      </button>
    </form>
  );
}
