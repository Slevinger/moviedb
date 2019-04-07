import React from "react";
import "./movie-title-component.css";

export default class MovieTitle extends React.PureComponent {
  constructor() {
    super();
    this.renderMovieTitle = this.renderMovieTitle.bind(this);
  }
  renderMovieTitle() {
    const { movie } = this.props;
    console.log(movie);
    return (
      <div className="movie-title-component">
        <span className="movie__title">{movie.title}</span>
        <img
          className="movie__poster"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        />
        <text className="overview__title">Overview : </text>
        <div className="movie__summary">
          <p className="movie__overview">{movie.overview}</p>
          <div className="release__date">
            <text className="overview__title">Release Date : </text>
            <text className="movie__overview">{movie.release_date}</text>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dialog__" onClick={this.props.onClick.bind(this)}>
        {this.renderMovieTitle()}
      </div>
    );
  }
}
