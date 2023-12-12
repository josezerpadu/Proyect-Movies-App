/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MovieDetails from "./pages/Detail/MovieDetails";
import Favorite from "./pages/Favorite/Favorite";
import Home from "./pages/Home/Home";

function App() {

  return (
    <>
      <BrowserRouter>
      
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
