/* eslint-disable react-hooks/exhaustive-deps */
// import './App.css'
//import "./style/MovieDetails.css";
//import "./style/MovieList.css";
//import "./style/Header.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MovieDetails from "./pages/Detail/MovieDetails";
import Favorite from "./pages/Favorite/Favorite";
import Home from "./pages/Home/Home";
import HeaderNav from "./component/HeaderVav/HeaderNav";

function App() {

  return (
    <>
      <BrowserRouter>
      <HeaderNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
