import React from "react";
import MovieComponenet from "./movie/movie-component";
import Menu from "../menu/menu-component";
import axios from "axios";
import "./movies-component.css";

const NOW_PLAYING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=d52d8a839b115e7632447aaf98f1c70d&region=us";

export default class MoviesComponenet extends React.PureComponent {
  constructor(props) {
    super(props);

    this.likeMovie = this.likeMovie.bind(this);

    // favorites is kept as an array , so i transform it to a map
    let fav = props.favorites
      ? Object.values(props.favorites).reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {})
      : {};

    this.state = {
      movies: null,
      favorites: fav,
      show_favorites: false
    };
  }

  componentDidMount() {
    axios.get(NOW_PLAYING_MOVIES_URL).then(({ data: { results: movies } }) => {
      this.setState({ movies });
    });
  }

  likeMovie(movieId) {
    const { favorites } = this.state;
    const newFavorites = { ...favorites, [movieId]: !favorites[movieId] };
    const url = `http://localhost:8080${
      newFavorites[movieId] ? "/user/add/favorite" : "/user/remove/favorite"
    }`;
    axios.post(url, { movie_id: movieId, user_id: this.props._id });
    this.setState({ favorites: newFavorites });
  }

  render() {
    const { movies, favorites } = this.state;
    const { show_favorites, setState } = this.props;
    return (
      <div className="movies__container">
        {movies &&
          movies
            .filter(movie => (show_favorites ? favorites[movie.id] : 1))
            .map(movie => {
              const isLiked = favorites[movie.id];
              return (
                <MovieComponenet
                  movie={movie}
                  likeMovie={this.likeMovie}
                  isLiked={isLiked}
                  setState={setState}
                />
              );
            })}{" "}
      </div>
    );
  }
}
