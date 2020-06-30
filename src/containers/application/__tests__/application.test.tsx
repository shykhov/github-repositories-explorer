import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Application } from '../application';

describe('<Application />', () => {
  let renderedComponent: ShallowWrapper;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<Application />);
  });

  it('should render Application', () => {
    expect(renderedComponent.dive()).toMatchSnapshot();
  });
});
