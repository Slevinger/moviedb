import React from "react";
import MovieComponenet from "./movie/movie-component";
import axios from "axios";
import "./movies-component.css";

const NOW_PLAYING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=d52d8a839b115e7632447aaf98f1c70d&region=us";

export default class MoviesComponenet extends React.PureComponent {
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

  render() {
    const { movies, favorites } = this.state;

    return (
      movies &&
      movies.map(movie => {
        const isLiked = favorites[movie.id];

        return (
          <MovieComponenet
            movie={movie}
            likeMovie={this.likeMovie}
            isLiked={isLiked}
          />
        );
      })
    );
  }
}
