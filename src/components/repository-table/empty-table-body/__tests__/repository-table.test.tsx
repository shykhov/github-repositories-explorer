import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { EmptyTableBody, Props } from '../empty-table-body';

describe('<EmptyTableBody />', () => {
  let shallowRenderedComponent: ShallowWrapper;
  let propsMock: Props;

  beforeEach(() => {
    propsMock = {
      error: true,
      called: true,
      hasNoQueryParameters: false,
      isEmptyRepositoriesList: false,
    };

    shallowRenderedComponent = shallow(<EmptyTableBody {...propsMock} />).dive();
  });

  it('should render EmptyTableBody with error message', () => {
    expect(shallowRenderedComponent).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on filters state', () => {
    shallowRenderedComponent.setProps({ called: true, error: false, isEmptyRepositoriesList: true });

    expect(shallowRenderedComponent).toMatchSnapshot();
  });

  it('should render EmptyTableBody with with error message anyway', () => {
    shallowRenderedComponent.setProps({ called: true, error: true, isEmptyRepositoriesList: true });

    expect(shallowRenderedComponent).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on lack of filters', () => {
    shallowRenderedComponent.setProps({ error: false, hasNoQueryParameters: true });

    expect(shallowRenderedComponent).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on lack of query papameters even if there are repositories', () => {
    shallowRenderedComponent.setProps({ error: false, isEmptyRepositoriesList: false, hasNoQueryParameters: true });

    expect(shallowRenderedComponent).toMatchSnapshot();
  });

  it('should render EmptyTableBody with empty message based on lack of query papameters even if there are repositories and called was already made', () => {
    shallowRenderedComponent.setProps({
      error: false,
      called: true,
      isEmptyRepositoriesList: false,
      hasNoQueryParameters: true,
    });

    expect(shallowRenderedComponent).toMatchSnapshot();
  });
});
