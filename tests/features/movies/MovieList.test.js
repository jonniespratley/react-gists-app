import React from 'react';
import { shallow } from 'enzyme';
import { MovieList } from '../../../src/features/movies';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MovieList />);
  expect(renderedComponent.find('.movies-movie-list').length).toBe(1);
});
