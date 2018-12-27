import React from 'react';
import { shallow } from 'enzyme';
import { GlobalHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GlobalHeader />);
  expect(renderedComponent.find('.common-global-header').length).toBe(1);
});
