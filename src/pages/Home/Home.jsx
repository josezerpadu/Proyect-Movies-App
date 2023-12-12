/* eslint-disable no-undef */
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
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [test, setTest] = useState(true);

  const cargarFavoritos = async () => {
    try {
      setSpinner(true);
      const respuesta = await fetch(
        "https://api-movies-tdt.vercel.app/api/auth/profile/6571ed3f7c91f4d6840f2a47"
      );
      const data = await respuesta.json();
      setFavoriteMovies(data.profile.movies_likes);
    } catch (error) {
      console.log("ERROR");
    }
    setSpinner(false);
  };

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
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setSpinner(false);
  };

  const agregarFavorito = async (movie) => {
    try {
      if (!favoriteMovies.some((elemet) => elemet.id === movie.id)) {
        const res = await fetch(
          "https://api-movies-tdt.vercel.app/api/auth/like-movie/6571ed3f7c91f4d6840f2a47",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: movie.id,
              titulo: movie.original_title,
              imagen: movie.poster_path,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(
            "Unauthorized: No se ha podido autenticar :" + res.status
          );
        }
        cargarFavoritos();
        setTest(false);
      } else {
        alert("La pelicula ya esta en favoritos");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchMovies();
    } else {
      searchMovies();
    }
    cargarFavoritos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Determinar qué películas mostrar basadas en la búsqueda o las populares
  const moviesToDisplay = searchTerm.trim() === "" ? movies : searchResults;

  return (
    <>
      <HeaderNav
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        numberFavoritos={favoriteMovies}
      />
      <Spinner spinner={spinner} />
      <MovieList
        moviesToDisplay={moviesToDisplay}
        agregarFavorito={agregarFavorito}
        test={test}
        favoriteMovies={favoriteMovies}
      />
    </>
  );
}

export default Home;
