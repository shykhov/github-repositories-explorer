import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { RepositoriesSearchInput } from '../repositories-search-input';

describe('<RepositoriesSearchInput />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock;

  beforeEach(() => {
    propsMock = {
      handleSearchInputChange: jest.fn(),
      debouncedSubmitInputSearch: { flush: jest.fn() },
      loading: false,
      value: 'some',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<RepositoriesSearchInput {...propsMock} />);
  });

  it('should render RepositoriesSearchInput', () => {
    expect(renderedComponent.dive()).toMatchSnapshot();
  });
});
