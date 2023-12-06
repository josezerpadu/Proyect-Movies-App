/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdOutlineFavorite } from "react-icons/md";

const MovieList = ({ moviesToDisplay }) => {
  // Aca retornarmos en pantalla nuestro listado de peliculas
  return (
    <>
      <div className="container">
        <ul className="movie-list">
          {/* Recorremos cada posicion en el arreglo y extraemos sus datos en una lista y mostramo en pantalla */}
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
                <Link to={`/favorite`} className="movie-link">
                <span>{<MdOutlineFavorite className="react-icon" />}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
