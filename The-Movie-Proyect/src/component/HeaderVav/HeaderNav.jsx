import "./HeaderNav.css";
import { AiOutlineWeibo } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeaderNav = ({ searchTerm, handleSearch }) => {
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
      <div className="header-container">
        <Link to={`/favorite`} className="movie-link">
          <button className="btn-fav">Favoritos</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;
