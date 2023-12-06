/* eslint-disable react/prop-types */
import { AiOutlineWeibo } from "react-icons/ai";
import { Link } from 'react-router-dom';

const HeaderNav = ({searchTerm, handleSearch}) => {
  return (
    <div className='header-container'>
      <Link to={`/`} className="movie-link">
      <h1 className='brand'>  
        Pana<span className='logo-tv'>Tv {<AiOutlineWeibo />}</span>
      </h1>
      </Link>
      <div className="container-input">
        <input
          className="input"
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default HeaderNav;
