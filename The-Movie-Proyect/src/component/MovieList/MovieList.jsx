/* eslint-disable react/prop-types */
import { MdOutlineFavorite } from "react-icons/md";

const MovieList = ({ movies }) => {
  // Aca retornarmos en pantalla nuestro listado de peliculas
  return (
    <>
      <div className="container">
        <ul className="movie-list">
          {/* Recorremos cada posicion en el arreglo y extraemos sus datos en una lista y mostramo en pantalla */}
          {movies.map((movie) => (
            <li
              key={movie.id} // Identificador unico para que cada uno de los item a imprimir
              className="movie-item"
            >
              {movie.poster_path ? (
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : null}
              <div>
                <span>{<MdOutlineFavorite className="react-icon" />}</span>
              </div>
              <h2 className="movie-title">{movie.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieList;
