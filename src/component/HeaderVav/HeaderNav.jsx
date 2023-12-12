/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./HeaderNav.css";
import { AiOutlineWeibo } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect,  useState } from "react";

const HeaderNav = ({ searchTerm, handleSearch, numberFavoritos}) => {
  
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (numberFavoritos && numberFavoritos.length) {
      setNumber(numberFavoritos.length);
    } else {
      setNumber('');
    }
  }, [numberFavoritos]);

  return (
    <div className="header-container">
      <div className="">
        <h1 className="brand">
          Pana
          <Link to={`/`} className="movie-link">
            <span className="logo-tv">Tv {<AiOutlineWeibo />}</span>
          </Link>
        </h1>
      </div>
      <div className="container-input">
        <input
          className="input"
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
        <Link to={`/favorite`} className="movie-link">
          <button className="btn-fav">Favoritos {number}</button>
        </Link>
    </div>
  );
};

export default HeaderNav;
