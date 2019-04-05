import React from "react";

export default class MovieComponenet extends React.PureComponent {
  constructor() {
    super();

    this.likeMovie = this.likeMovie.bind(this);
  }

  likeMovie() {
    const { likeMovie, movie } = this.props;

    likeMovie(movie.id);
  }

  render() {
    const { movie, isLiked } = this.props;

    return (
      <div class="movie">
        <img
          class="movie-image"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        />
        <div class="like-star-wrapper" onClick={this.likeMovie}>
          <span class={`like-star ${isLiked ? "movie-liked" : ""}`}>★</span>
        </div>
      </div>
    );
  }
}
