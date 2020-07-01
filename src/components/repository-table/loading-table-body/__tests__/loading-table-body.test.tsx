import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { LoadingTableBody } from '../loading-table-body';

describe('<LoadingTableBody />', () => {
  let renderedComponent: ShallowWrapper;

  beforeEach(() => {
    renderedComponent = shallow(<LoadingTableBody />);
  });

  it('should render LoadingTableBody', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
