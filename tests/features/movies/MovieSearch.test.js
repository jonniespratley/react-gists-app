import React from 'react';
import { shallow } from 'enzyme';
import { MovieSearch } from '../../../src/features/movies';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MovieSearch />);
  expect(renderedComponent.find('.movies-movie-search').length).toBe(1);
});
