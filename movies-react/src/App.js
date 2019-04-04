import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=d52d8a839b115e7632447aaf98f1c70d&region=us"
      )
      .then(({ data: { results: movies } }) => {
        this.setState({ movies });
      });
  }

  renderMovies() {
    const { movies } = this.state;

    return (
      movies &&
      movies.map(movie => {
        return (
          <div class="movie">
            <img
              class="movie-image"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            />
          </div>
        );
      })
    );
  }

  render() {
    return <div className="App">{this.renderMovies()}</div>;
  }
}

export default App;
