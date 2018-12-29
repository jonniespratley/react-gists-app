import React from 'react';
import { shallow } from 'enzyme';
import { MovieContainer } from '../../../src/features/movies/MovieContainer';

describe('movies/MovieContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      movies: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MovieContainer {...props} />
    );

    expect(
      renderedComponent.find('.movies-movie-container').length
    ).toBe(1);
  });
});
