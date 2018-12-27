import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/gists';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<List />);
  expect(renderedComponent.find('.gists-list').length).toBe(1);
});
