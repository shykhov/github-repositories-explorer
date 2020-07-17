import React from 'react';
import { render, shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { RepositoriesChart, RepositoriesChartProps } from '../repositories-chart';

describe('<RepositoriesChart />', () => {
  let propsMock: RepositoriesChartProps;

  beforeEach(() => {
    propsMock = {
      loading: false,
      repositoryNameSearchParameter: 'test-repository-name',
      userLoginParameter: 'test-login-name',
      chartData: [
        {
          stars: 0,
          name: 'ASDQWEA1/ASDQWEA1',
          forks: 0,
        },
        {
          stars: 0,
          name: 'JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
          forks: 0,
        },
        {
          stars: 0,
          name: 'SLCDevelopment/asdqweasdqweaaa',
          forks: 0,
        },
      ],
    };
  });

  const renderedComponent: unknown = render(<RepositoriesChart {...propsMock} />);
  const shallowRenderedComponent: ShallowWrapper = shallow(<RepositoriesChart {...propsMock} />);

  it('should render RepositoriesChart', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should shallow render RepositoriesChart', () => {
    expect(shallowRenderedComponent).toMatchSnapshot();
  });
});
