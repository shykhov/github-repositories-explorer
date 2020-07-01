import React from 'react';
import { shallow, render, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { Select } from '../user-search-select.styled';
import { UserSearchSelect, Props } from '../user-search-select';

describe('<UserSearchSelect />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock: Props;
  const firstMockSelectValue = { value: 'test-value-1', label: 'test-label-1', iconSrc: 'test-icon-1' };
  const secondMockSelectValue = { value: 'test-value-2', label: 'test-label-2', iconSrc: 'test-icon-2' };

  beforeEach(() => {
    propsMock = {
      onInputChange: jest.fn(),
      onSelectChange: jest.fn(),
      value: firstMockSelectValue,
      loading: false,
      options: [firstMockSelectValue, secondMockSelectValue],
      noOptionsMessage: 'no-options-test',
      inputValue: 'some-value',
    };

    renderedComponent = shallow(<UserSearchSelect {...propsMock} />);
  });

  it('should render UserSearchSelect', () => {
    const wrapper: unknown = render(<UserSearchSelect {...propsMock} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should set noOptionsMessage to propsMock value if there is no inputValue and loading is false', () => {
    expect(
      renderedComponent.find(Select).props().noOptionsMessage({ inputValue: undefined, loading: propsMock.loading }),
    ).toEqual(propsMock.noOptionsMessage);
  });

  it('should set noOptionsMessage to undefined if there is inputValue', () => {
    expect(renderedComponent.find(Select).props().noOptionsMessage({ inputValue: propsMock.inputValue })).toEqual(
      undefined,
    );
  });

  it('should set noOptionsMessage to undefined if loading is true', () => {
    renderedComponent.setProps({ loading: true });
    expect(renderedComponent.find(Select).props().noOptionsMessage({ loading: propsMock.loading })).toEqual(undefined);
  });

  it('should call onSelectChange with mocked value on change event', () => {
    renderedComponent.find(Select).simulate('change', secondMockSelectValue);
    expect(propsMock.onSelectChange).toHaveBeenCalledTimes(1);
    expect(propsMock.onSelectChange).toHaveBeenCalledWith(secondMockSelectValue);
  });
});
