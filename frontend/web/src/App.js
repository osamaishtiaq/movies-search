import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SearchResults from "./pages/searchResults";
import SingleResult from "./pages/singleResult";
import RequestMoviePage from "./pages/requestMovie";

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/movie/id=:id" element={<SingleResult />} />
          <Route path="/search/searchTerm=:input" element={<SearchResults />} />
          <Route path="/requestMovie" element={<RequestMoviePage />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
