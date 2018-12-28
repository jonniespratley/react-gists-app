import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/movies/DefaultPage';

describe('movies/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      movies: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.movies-default-page').length
    ).toBe(1);
  });
});
