import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/gists/DefaultPage';

describe('gists/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      gists: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.gists-default-page').length
    ).toBe(1);
  });
});
