import React, { Component } from 'react';
import MovieListItem from './MovieListItem';
import { Pane } from 'evergreen-ui';

export default class MovieList extends Component {
  static propTypes = {

  };
  static defaultProps = {
    items: [
      {Id: 1, Title: 'Movie'}
    ]
  };

  render() {
    return (
      <Pane className="movies-movie-list" display="flex" flexWrap="wrap">
        {this.props.items && this.props.items.map(movie => (
          <MovieListItem key={movie.imdbID} {...movie} />
        ))}
      </Pane>
    );
  }
}
