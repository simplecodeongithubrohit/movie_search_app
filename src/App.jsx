import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'b0268af';

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movie list:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Type a movie title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      {!selectedMovie && (
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => fetchMovieDetails(movie.imdbID)}
              style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', width: '250px' }}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : 'https://via.placeholder.com/250x350?text=No+Image'
                }
                alt={movie.Title}
                style={{ width: '100%', marginBottom: '5px' }}
              />
              <h3 style={{ margin: '0' }}>{movie.Title}</h3>
              <p style={{ margin: '0' }}>{movie.Year}</p>
            </div>
          ))}
          {movies.length === 0 && !loading && <p>No results found.</p>}
        </div>
      )}
      {selectedMovie && (
        <div style={{ marginTop: '20px' }}>
          <h2>{selectedMovie.Title}</h2>
          <img
            src={
              selectedMovie.Poster !== "N/A"
                ? selectedMovie.Poster
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={selectedMovie.Title}
            style={{ width: '200px' }}
          />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <button onClick={() => setSelectedMovie(null)} style={{ padding: '5px 10px' }}>
            Back to Results
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
