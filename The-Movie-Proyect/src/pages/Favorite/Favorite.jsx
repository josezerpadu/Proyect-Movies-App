/* eslint-disable react-hooks/exhaustive-deps */
import MovieList from "../../component/MovieList/MovieList";
import HeaderNav from "../../component/HeaderVav/HeaderNav";
import Spinner from "../../component/Spinner/Spinner";
import { useEffect, useState } from "react";
import favorite from '../../bd.json'

function Favorite() {
    const movie = favorite.results;

    useEffect(() => {
    
    }, []);

  return (
    <>
        <MovieList moviesToDisplay={movie} />
    </>
  );
}

export default Favorite
