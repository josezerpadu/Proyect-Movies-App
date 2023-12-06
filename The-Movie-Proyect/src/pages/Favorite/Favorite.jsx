/* eslint-disable react-hooks/exhaustive-deps */
import "../../style/MovieList.css"
import MovieList from "../../component/MovieList";
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
