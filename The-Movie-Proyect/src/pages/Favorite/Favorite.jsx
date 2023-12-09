import Spinner from "../../component/Spinner/Spinner";
import MovieListFav from "../../component/MovieList/MovieListFav";
import { useEffect, useState } from "react";

function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const cargarFavoritos = async () => {
    try {
      setSpinner(true);
      const respuesta = await fetch(
        "https://api-movies-tdt.vercel.app/api/auth/profile/6571ed3f7c91f4d6840f2a47"
      );
      const data = await respuesta.json();
      setFavoriteMovies(data.profile.movies_likes);

      console.log(data.profile.movies_likes);
    } catch (error) {
      console.log("ERROR");
    }
    setSpinner(false);
  };

  useEffect(() => {
    cargarFavoritos();
  }, []);

  return (
    <>
      <Spinner spinner={spinner} />
      <MovieListFav moviesToDisplay={favoriteMovies} />
    </>
  );
}

export default Favorite;
