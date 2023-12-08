
import MovieList from "../../component/MovieList/MovieList";
import HeaderNav from "../../component/HeaderVav/HeaderNav";
import Spinner from "../../component/Spinner/Spinner";

import { useEffect, useState } from "react";

const URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";
const API_KEYS = "api_key=430bfb8ead0cc8146e757cfa6600f723";
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
const LANGUAJE = "language=es-ES";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const fetchMovies = async () => {
    try {
      setSpinner(true);
      const res = await fetch(`${URL_POPULAR}?${LANGUAJE}&${API_KEYS}`);
      const data = await res.json();

      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setSpinner(false);
  };
 
  const searchMovies = async () => {
    try {
      if (searchTerm.trim().length > 2) {
        setSpinner(true);
        const res = await fetch(
          `${URL_SEARCH}?${LANGUAJE}&${API_KEYS}&query=${searchTerm}`
        );
        const data = await res.json();
        
        setSearchResults(data.results);
        console.log(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setSpinner(false);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchMovies();
    }
    else{
      searchMovies();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Determinar qué películas mostrar basadas en la búsqueda o las populares
  const moviesToDisplay = searchTerm.trim() === "" ? movies : searchResults;

  return (
    <>
      <HeaderNav searchTerm={searchTerm} handleSearch={handleSearch} />
      <Spinner spinner={spinner}/>
      <MovieList moviesToDisplay={moviesToDisplay} />
    </>
  );
}

export default Home;
