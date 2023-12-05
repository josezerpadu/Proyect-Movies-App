/* eslint-disable react-hooks/exhaustive-deps */
// import './App.css'
import './style/MovieDetails.css'
import "./style/MovieList.css";
import "./style/Header.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderNav from "./component/HeaderNav";
import MovieList from "./component/MovieList";
import MovieDetails from "./component/MovieDetails";
import { useEffect, useState } from "react";

const URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";
const API_KEYS = "api_key=430bfb8ead0cc8146e757cfa6600f723";
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
const LANGUAJE = "language=es-ES";

// Funcionalidad para representar listado de películas populares
function App() {
  // Estado para almacenar las películas populares
  const [movies, setMovies] = useState([]);
  // Estado para el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

 
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${URL_POPULAR}?${LANGUAJE}&${API_KEYS}`);
        const data = await res.json();

        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

  
  // Efecto para realizar la búsqueda cuando cambia el término de búsqueda
  
    const searchMovies = async () => {
      try {
        if (searchTerm.trim().length > 2) {
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
    <Router>
        <HeaderNav searchTerm={searchTerm} handleSearch={handleSearch} />
        <Routes>
          <Route
            exact
            path="/"
            element={<MovieList moviesToDisplay={moviesToDisplay} />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
