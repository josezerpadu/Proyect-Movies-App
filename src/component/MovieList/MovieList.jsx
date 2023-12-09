import "./MovieList.css";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { useEffect, useState } from "react";

const MovieList = ({ moviesToDisplay }) => {
  // Funcion que añade a favoritos al darle click en el corazon de la pelicula
  const agregarFavorito = async (movie) => {
    try {
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Aca retornarmos en pantalla nuestro listado de peliculas
  return (
    <>
      <div className="container">
        <ul className="movie-list">
          {moviesToDisplay.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                {movie.poster_path ? (
                  <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : null}
                <h2 className="movie-title">{movie.title}</h2>
              </Link>
              <div>
                <span onClick={() => agregarFavorito(movie)}>
                  {<MdOutlineFavorite className="react-icon" />}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
