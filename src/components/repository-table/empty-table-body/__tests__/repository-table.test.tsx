import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { EmptyTableBody } from '../empty-table-body';

describe('<EmptyTableBody />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock;

  beforeEach(() => {
    propsMock = {
      error: true,
      called: true,
    };

    renderedComponent = shallow(<EmptyTableBody {...propsMock} />);
  });

  it('should render EmptyTableBody with error message', () => {
    expect(renderedComponent.dive()).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on filters state', () => {
    renderedComponent.setProps({ called: true, error: false });

    expect(renderedComponent.dive()).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on lack of filters', () => {
    renderedComponent.setProps({ called: false, error: false });

    expect(renderedComponent.dive()).toMatchSnapshot();
  });
});
