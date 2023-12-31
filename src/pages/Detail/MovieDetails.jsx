/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import "./MovieDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import Spinner from "../../component/Spinner/Spinner";

import { MdOutlineFavorite } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

import HeaderNav from "../../component/HeaderVav/HeaderNav";

const MovieDetails = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL
  const [spinner, setSpinner] = useState(false);
  // Estado para almacenar los detalles de la película
  const [movieDetails, setMovieDetails] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

  // Función para obtener los detalles de la película con movieId
  const fetchMovieDetails = async () => {
    try {
      // Hacer una solicitud para obtener los detalles de la película usando movieId
      setSpinner(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=es-ES&api_key=430bfb8ead0cc8146e757cfa6600f723`
      );
      const data = await res.json();
      setMovieDetails(data); // Actualizar el estado con los detalles de la película
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setSpinner(false);
  };

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
      cargarFavoritos();
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(); // Llamar a la función para obtener los detalles de la película
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cargarFavoritos();
  }, [id]);

  return (
    <>
      <Spinner spinner={spinner} />
      <HeaderNav numberFavoritos={favoriteMovies} />

      {movieDetails ? (
        <div className="container-moviesdetails">
          <div className="back">
            <Link to={"/"} className="movie-link">
              <span className="back-icon">
                <IoMdArrowBack />
              </span>
            </Link>
          </div>

          <img
            className="img-moviesdetails"
            src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
            alt=""
          />
          {!favoriteMovies.some((elemtId) => elemtId.id === movieDetails.id) ? (
            <div>
              <span
                className="icon-details"
                onClick={() => agregarFavorito(movieDetails)}
              >
                <MdOutlineFavorite className="react-icon" />
              </span>
            </div>
          ) : (
            ""
          )}

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

            {movieDetails.revenue !== 0 ? (
              <p className="text">
                Ganancias:{" "}
                <span> {movieDetails.revenue.toLocaleString()}$ </span>
              </p>
            ) : (
              <p className="text">
                Ganancias: <span> !!! </span>
              </p>
            )}

            <p className="text">
              Lanzamiento: <span> {movieDetails.release_date}</span>
            </p>
            <p className="text">
              Duracion: <span> {movieDetails.runtime} min</span>
            </p>
            <p className="text">
              Valoracion:{" "}
              <span>
                {movieDetails.vote_average}{" "}
                <span className="icon-likes">
                  <BiLike />
                </span>
              </span>
            </p>
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
