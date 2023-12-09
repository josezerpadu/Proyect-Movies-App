import "./MovieList.css";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { useEffect, useState } from "react";

const MovieListFav = ({ moviesToDisplay }) => {
  const [favoriteMovies, setFavoriteMovies] = useState(false);
  // Funcion que elimina a favoritos al darle click en el corazon de la pelicula
  const deleteFavorite = async (movie) => {
    try {
      const res = await fetch(
        "https://api-movies-tdt.vercel.app/api/auth/deslike-movie/6571ed3f7c91f4d6840f2a47",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movie.id,
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
    setFavoriteMovies(true);
  };

  // funcion que muestra los favoritos
  useEffect(() => {
    if (favoriteMovies) {
      window.location.reload();
    }
  }, [deleteFavorite]);

  return (
    <>
      <div className="container">
        <ul className="movie-list">
          {moviesToDisplay.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                {movie.imagen ? (
                  <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w500/${movie.imagen}`}
                    alt={movie.titulo}
                  />
                ) : null}
                <h2 className="movie-title">{movie.title}</h2>
              </Link>
              <div>
                <span onClick={() => deleteFavorite(movie)}>
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

export default MovieListFav;
