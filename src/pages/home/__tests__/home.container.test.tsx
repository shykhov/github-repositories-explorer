import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { RouteComponentProps } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import 'jest-styled-components';

import { HomeContainer } from '../home';

jest.mock('../../../hooks', () => ({
  useUrlQuery: jest.fn(),
}));

describe('<HomeContainer />', () => {
  let shallowRenderedComponent: ShallowWrapper;
  let propsMock: RouteComponentProps;

  beforeEach(() => {
    shallowRenderedComponent = shallow(
      <MockedProvider addTypename={false}>
        <HomeContainer {...propsMock} />
      </MockedProvider>,
    )
      .dive()
      .dive()
      .dive()
      .dive();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render HomeContainer', () => {
    expect(shallowRenderedComponent).toMatchSnapshot();
  });
});
