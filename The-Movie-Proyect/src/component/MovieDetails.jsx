/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";

const MovieDetails = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL

  // Estado para almacenar los detalles de la película
  const [movieDetails, setMovieDetails] = useState(null);
  console.log(id);
  useEffect(() => {
    // Función para obtener los detalles de la película con movieId
    const fetchMovieDetails = async () => {
      try {
        // Hacer una solicitud para obtener los detalles de la película usando movieId
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=es-ES&api_key=430bfb8ead0cc8146e757cfa6600f723`
        );
        const data = await res.json();

        console.log(data);
        setMovieDetails(data); // Actualizar el estado con los detalles de la película
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails(); // Llamar a la función para obtener los detalles de la película
  }, [id]);

  return (
    <>
      {movieDetails ? (
        <div className="container-moviesdetails">
          <img
            className="img-moviesdetails"
            src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
            alt=""
          />
          <div className="container-descriptions">
            <h1 className="title-movies">{movieDetails.title}</h1>

            <div className="container-genres">
              {movieDetails.genres.map((genres) => (
                <p key={genres.id} className="styles-genres">
                  {genres.name}
                </p>
              ))}
            </div>
            <p className="text-overview">{`"${movieDetails.overview}"`}</p>

            {(movieDetails.revenue !== 0) 
              ? <p className="text">Ganancias: <span> {movieDetails.revenue.toLocaleString()}$ </span></p>
              : <p className="text">Ganancias: <span> !!! </span></p>
            }

            <p className="text">Lanzamiento: <span> {movieDetails.release_date}</span></p>
            <p className="text">Duracion: <span> {movieDetails.runtime} min</span></p>
            <p className="text">Valoracion: <span>{movieDetails.vote_average} <span className="icon-likes"><BiLike /></span></span></p>
            <p className="styles-genres">English</p>
          </div>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </>
  );
};

export default MovieDetails;
