import React from 'react';
import { shallow } from 'enzyme';
import { Detail } from '../../../src/features/gists';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Detail />);
  expect(renderedComponent.find('.gists-detail').length).toBe(1);
});
