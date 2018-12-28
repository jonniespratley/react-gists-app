import React from 'react';
import { shallow } from 'enzyme';
import { MovieListItem } from '../../../src/features/movies';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MovieListItem />);
  expect(renderedComponent.find('.movies-movie-list-item').length).toBe(1);
});
