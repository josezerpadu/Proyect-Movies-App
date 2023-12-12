/* eslint-disable react/prop-types */
import "./MovieList.css";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const MovieListFav = ({ moviesToDisplay, deleteFavorite }) => {

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
                <h2 className="movie-title">{movie.titulo}</h2>
              </Link>
              <div>
                <span onClick={() => deleteFavorite(movie)}>
                  {<TiDelete  className="react-icon" />}
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
