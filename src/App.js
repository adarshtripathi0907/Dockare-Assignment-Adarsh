import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "e16deb75";
const API_URL = "https://www.omdbapi.com/";

function App() {
  const [searchQuery, setSearchQuery] = useState("khushi");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: searchQuery,
        },
      });

      setSearchResults(response.data.Search);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (imdbID) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          i: imdbID,
        },
      });

      setSelectedMovie(response.data);
    } catch (err) {
      setError("Error fetching movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <h1>Movie Database Browser</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {searchResults.length > 0 &&
          searchResults.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleSelectMovie(movie.imdbID)}
            >
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>({movie.Year})</p>
              </div>
            </div>
          ))}
      </div>

      {selectedMovie && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>
              {selectedMovie.Title} ({selectedMovie.Year})
            </h2>
            <p>{selectedMovie.Plot}</p>
            <p className="info">Cast: {selectedMovie.Actors}</p>
            <p className="info">Ratings: {selectedMovie.imdbRating}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
