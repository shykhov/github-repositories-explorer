import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { UserSearchSelect } from '../user-search-select';

describe('<UserSearchSelect />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock;
  const firstMockSelectValue = { value: 'test-value-1', label: 'test-label-1', iconSrc: 'test-icon-1' };
  const secondMockSelectValue = { value: 'test-value-2', label: 'test-label-2', iconSrc: 'test-icon-2' };

  beforeEach(() => {
    propsMock = {
      onInputChange: jest.fn(),
      onSelectChange: jest.fn(),
      value: firstMockSelectValue,
      loading: false,
      options: [firstMockSelectValue, secondMockSelectValue],
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<UserSearchSelect {...propsMock} />);
  });

  it('should render UserSearchSelect', () => {
    expect(renderedComponent.dive().dive()).toMatchSnapshot();
  });

  it('should render UserSearchSelect with true state', () => {
    renderedComponent.setProps({ loading: true });

    expect(renderedComponent.dive().dive()).toMatchSnapshot();
  });

  it('should render UserSearchSelect with empty value', () => {
    renderedComponent.setProps({ value: undefined });

    expect(renderedComponent.dive().dive()).toMatchSnapshot();
  });

  it('should render UserSearchSelect with empty options', () => {
    renderedComponent.setProps({ value: undefined });

    expect(renderedComponent.dive().dive()).toMatchSnapshot();
  });
});
