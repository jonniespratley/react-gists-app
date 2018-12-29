import React, { Component } from 'react';
import { Pane, Text } from 'evergreen-ui';
import { Heading } from 'evergreen-ui/commonjs/typography';

export default class MovieListItem extends Component {
  static propTypes = {

  };
  render() {
    return (
        <Pane border 
          margin={5} 
          padding={10} 
          flex="1 0 200"
          flexDirection="column"
          alignItems="center"
          className="movies-movie-list-item">
          <img src={this.props.Poster} alt={this.props.Title} />
          <Heading size={500}>{this.props.Title}</Heading>
          <Text>{this.props.Title}</Text>
        </Pane>
    );
  }
}
