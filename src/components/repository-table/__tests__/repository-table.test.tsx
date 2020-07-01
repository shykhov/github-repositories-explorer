import React from 'react';
import { render, shallow, ShallowWrapper } from 'enzyme';
import TablePagination from '@material-ui/core/TablePagination';
import 'jest-styled-components';

import { RepositoryTable, Props } from '../repository-table';

const repositoriesMockData = {
  repositoryCount: 3,
  pageInfo: {
    endCursor: 'Y3Vyc29yOjM=',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'Y3Vyc29yOjE=',
  },
  elements: [
    {
      stars: 0,
      nameWithOwner: 'ASDQWEA1/ASDQWEA1',
      forks: 0,
      url: 'https://github.com/ASDQWEA1/ASDQWEA1',
      id: 'MDEwOlJlcG9zaXRvcnkxMTc2ODgyMTY=',
    },
    {
      stars: 0,
      nameWithOwner: 'JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
      forks: 0,
      url: 'https://github.com/JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
      id: 'MDEwOlJlcG9zaXRvcnkxNjQ1MTA5MDg=',
    },
    {
      stars: 0,
      nameWithOwner: 'SLCDevelopment/asdqweasdqweaaa',
      forks: 0,
      url: 'https://github.com/SLCDevelopment/asdqweasdqweaaa',
      id: 'MDEwOlJlcG9zaXRvcnkxNDg0NTcyNzQ=',
    },
  ],
};

describe('<RepositoryTable />', () => {
  let renderedComponent: unknown;
  let shallowRenderedComponent: ShallowWrapper;
  let propsMock: Props;

  beforeEach(() => {
    propsMock = {
      error: false,
      called: true,
      loading: false,
      repositoriesData: repositoriesMockData,
      handleChangePage: jest.fn(),
      page: 0,
    };

    renderedComponent = render(<RepositoryTable {...propsMock} />);
    shallowRenderedComponent = shallow(<RepositoryTable {...propsMock} />);
  });

  it('should render RepositoryTable', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should Pagination component have count property equal repositoryCount from props', () => {
    expect(shallowRenderedComponent.find(TablePagination).props().count).toEqual(
      propsMock.repositoriesData.repositoryCount,
    );
  });

  it('should Pagination component have count property equal -1 if is loading true', () => {
    shallowRenderedComponent.setProps({ loading: true });
    expect(shallowRenderedComponent.find(TablePagination).props().count).toEqual(-1);
  });
});
