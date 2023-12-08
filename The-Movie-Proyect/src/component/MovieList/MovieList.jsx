/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./MovieList.css";
import { Link } from 'react-router-dom';
import { MdOutlineFavorite } from "react-icons/md";
import { useEffect, useState } from 'react';

const MovieList = ({ moviesToDisplay }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Funcion que añade a favoritos al darle click en el corazon de la pelicula
    const agregarFavorito = async (movie) => {
      try {
        const res = await fetch('https://api-movies-tdt.vercel.app/api/auth/like-movie/6571ed3f7c91f4d6840f2a47', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
          body: JSON.stringify({
            'id': movie.id,
            'titulo': movie.original_title,
            'imagen': movie.poster_path
        })
      });

        if (!res.ok) {
          throw new Error('Unauthorized: No se ha podido autenticar :' + res.status) 
        }

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // funcion que muestra los favoritos
  useEffect(() => {
  const cargarFavoritos = async () => {
    try {
      const respuesta = await fetch('https://api-movies-tdt.vercel.app/api/auth/profile/6571ed3f7c91f4d6840f2a47');
      const data = await respuesta.json();
      setFavoriteMovies(data)

      console.log(data.profile.movies_likes);
      
    } catch (error) {
      console.log('ERROR')
    }
  }

  cargarFavoritos()
}, []);
  





  // const [guardarFavorito, setguardarFavorito] = useState([]);

  // let data = bd
  // console.log('dataJeison', data)

  // // console.log(guardarFavorito.length)

  // // funcion para guardar guardar pelicula favorita
  // const agregarFavorite = (movie) =>{
  //   console.log('Se dio click en gragegar  a favorito');
  //   // setguardarFavorito([...guardarFavorito, movie]);
  //   // eslint-disable-next-line no-import-assign
  //   data = [...data, movie]
  //   console.log(data)

  // }

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
                
                <span onClick={() => agregarFavorito(movie) }>{<MdOutlineFavorite className="react-icon" />}</span>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


export default MovieList;
