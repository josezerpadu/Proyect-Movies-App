/* eslint-disable react/prop-types */
import { AiOutlineWeibo } from "react-icons/ai";
import { Link } from 'react-router-dom';

const HeaderNav = ({searchTerm, handleSearch}) => {
  return (
    <div className='header-container'>
      <h1 className='brand'>  
        Pana
        <Link to={`/`} className="movie-link">
          <span className='logo-tv'>Tv {<AiOutlineWeibo />}</span>
        </Link>
      </h1>
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
