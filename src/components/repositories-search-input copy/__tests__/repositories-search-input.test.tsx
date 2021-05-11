import React from 'react';
import { shallow, render, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { RepositoriesSearchInput, Props } from '../repositories-search-input';
import { StyledIconButton, StyledInputBase } from '../repositories.search.styled';

describe('<RepositoriesSearchInput />', () => {
  let renderedComponent: unknown;
  let shallowRenderedComponent: ShallowWrapper;
  let propsMock: Props;

  beforeEach(() => {
    propsMock = {
      handleSearchInputChange: jest.fn(),
      debouncedSubmitInputSearch: { flush: jest.fn() },
      loading: false,
      value: 'some',
    };

    shallowRenderedComponent = shallow(<RepositoriesSearchInput {...propsMock} />);
    renderedComponent = render(<RepositoriesSearchInput {...propsMock} />);
  });

  it('should render RepositoriesSearchInput', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should inlcude spinner inside input if loading is true and component has provided value', () => {
    propsMock.loading = true;

    shallowRenderedComponent = shallow(<RepositoriesSearchInput {...propsMock} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should call debouncedSubmitInputSearch.flush with value from props if user clicks on search icon', () => {
    shallowRenderedComponent.find(StyledIconButton).simulate('click');

    expect(propsMock.debouncedSubmitInputSearch.flush).toHaveBeenCalledTimes(1);
    expect(propsMock.debouncedSubmitInputSearch.flush).toHaveBeenCalledWith(propsMock.value);
  });

  it('should call debouncedSubmitInputSearch.flush with value from props if user press enter key inside input', () => {
    shallowRenderedComponent.find(StyledInputBase).simulate('keyDown', { keyCode: 13 });

    expect(propsMock.debouncedSubmitInputSearch.flush).toHaveBeenCalledTimes(1);
    expect(propsMock.debouncedSubmitInputSearch.flush).toHaveBeenCalledWith(propsMock.value);
  });

  it('should not call debouncedSubmitInputSearch.flush if user press another from enter key inside input', () => {
    shallowRenderedComponent.find(StyledInputBase).simulate('keyDown', { keyCode: 10 });

    expect(propsMock.debouncedSubmitInputSearch.flush).not.toHaveBeenCalled();
  });
});
