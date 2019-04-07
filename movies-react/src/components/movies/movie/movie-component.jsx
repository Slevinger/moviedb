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

  onClick(e) {
    const { movie } = this.props;
    this.props.setState({ dialog: "movieTitle", movie });
    e.preventDefault();
    console.log(movie);
  }

  render() {
    const { movie, isLiked } = this.props;

    return (
      <div class="movie">
        <text className="move__title__title">{movie.title}</text>
        <img
          class="movie-image"
          onClick={this.onClick.bind(this)}
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        />
        <div class="like-star-wrapper" onClick={this.likeMovie}>
          <span class={`like-star ${isLiked ? "movie-liked" : ""}`}>★</span>
        </div>
      </div>
    );
  }
}
