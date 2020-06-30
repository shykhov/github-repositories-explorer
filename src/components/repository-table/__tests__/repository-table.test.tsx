import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { REPOSITORIES_DEFAULT_DATA } from '../../../constants';
import { RepositoryTable } from '../repository-table';

describe('<RepositoryTable />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock;

  beforeEach(() => {
    propsMock = {
      error: false,
      called: true,
      loading: false,
      repositoriesData: REPOSITORIES_DEFAULT_DATA,
      handleChangePage: jest.fn(),
      page: 1,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<RepositoryTable {...propsMock} />);
  });

  it('should render RepositoryTable', () => {
    expect(renderedComponent.dive()).toMatchSnapshot();
  });
});
