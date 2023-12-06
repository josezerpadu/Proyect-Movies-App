
import MovieList from "../../component/MovieList/MovieList";
import HeaderNav from "../../component/BarraNav/HeaderNav";
import Spinner from "../../component/Spinner/Spinner";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";
const API_KEYS = "api_key=430bfb8ead0cc8146e757cfa6600f723";
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
const LANGUAJE = "language=es-ES";

function Home() {
  // Estado para almacenar las películas populares
  const [movies, setMovies] = useState([]);
  // Estado para el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);
  // Efecto para cargar las películas populares
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();


  // Función para cargar las películas populares
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

  // Función para cargar las películas cuando se realiza una búsqueda  
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
  }, [searchTerm]);


  // Función para manejar cambios en el campo de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Determinar qué películas mostrar basadas en la búsqueda o las populares
  const moviesToDisplay = searchTerm.trim() === "" ? movies : searchResults;

  return (
    <>
      <MovieList movies={moviesToDisplay}/>
    </>
  );
}

export default Home;
