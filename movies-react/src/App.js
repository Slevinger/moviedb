import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

const NOW_PLAYING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=d52d8a839b115e7632447aaf98f1c70d&region=us";

class App extends Component {
  constructor() {
    super();

    this.likeMovie = this.likeMovie.bind(this);

    this.state = {
      movies: null,
      favorites: {}
    };
  }

  componentDidMount() {
    axios.get(NOW_PLAYING_MOVIES_URL).then(({ data: { results: movies } }) => {
      this.setState({ movies });
    });
  }

  likeMovie(movieId) {
    const { favorites } = this.state;

    const newFavorites = { ...favorites, [movieId]: true };
    this.setState({ favorites: newFavorites });
  }

  renderMovie(movie) {
    const { favorites } = this.state;
    const isMovieLiked = favorites[movie.id];

    return (
      <div class="movie">
        <img
          class="movie-image"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        />
        <div
          class="like-star-wrapper"
          onClick={this.likeMovie.bind(this, movie.id)}
        >
          <span class={`like-star ${isMovieLiked ? "movie-liked" : ""}`}>
            ★
          </span>
        </div>
      </div>
    );
  }

  renderMovies() {
    const { movies } = this.state;

    return (
      movies &&
      movies.map(movie => {
        return this.renderMovie(movie);
      })
    );
  }

  render() {
    return <div className="App">{this.renderMovies()}</div>;
  }
}

export default App;
