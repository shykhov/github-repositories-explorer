/* eslint-disable no-param-reassign */
import React from 'react';
import { render, shallow, ShallowWrapper } from 'enzyme';
import { createBrowserHistory } from 'history';
import 'jest-styled-components';

import * as customHooks from '../../../hooks';
import { Home, HomeProps } from '../home';
import { MOCK_REPOSITORIES_DATA, MOCK_USERS_DATA, DEFAULT_PATHNAME } from '../../../constants';

jest.mock('../../../hooks', () => ({
  useUrlQuery: jest.fn(),
}));

jest.mock('lodash/debounce', () =>
  jest.fn((callback: Record<string, unknown>) => {
    callback.cancel = jest.fn();
    callback.flush = jest.fn();
    return callback;
  }),
);

jest.mock('../../../constants/repositories-per-page.constant', () => ({
  REPOSITORIES_PER_PAGE: 1,
}));

const newlyCreatedHistory = createBrowserHistory();

describe('<Home />', () => {
  let renderedComponent: unknown;
  let shallowRenderedComponent: ShallowWrapper;
  let propsMock: HomeProps;
  let useUrlQuerySpy: jest.Mocked<unknown>;

  jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());

  beforeEach(() => {
    propsMock = {
      getRepositories: jest.fn(),
      repositoriesQuery: {
        data: MOCK_REPOSITORIES_DATA,
        called: true,
        error: undefined,
        loading: false,
      },
      usersQuery: {
        data: MOCK_USERS_DATA,
        called: true,
        error: undefined,
        loading: false,
      },
      getUsers: jest.fn(),
      history: { ...newlyCreatedHistory, push: jest.fn() },
    };
    useUrlQuerySpy = jest.spyOn(customHooks, 'useUrlQuery');
    useUrlQuerySpy.mockImplementation((): unknown => new URLSearchParams('?userLogin=userLogin'));

    shallowRenderedComponent = shallow(<Home {...propsMock} />);

    renderedComponent = render(<Home {...propsMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Home', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should push url with new parameters if user search select input value was removed', () => {
    shallowRenderedComponent
      .find('RepositoriesSearchInput')
      .props()
      .handleSearchInputChange({ target: { value: undefined } });

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({
      pathname: DEFAULT_PATHNAME,
      search: '?userLogin=userLogin',
    });
  });

  it('should push url with new parameters based on typed value inside select input', () => {
    shallowRenderedComponent
      .find('RepositoriesSearchInput')
      .props()
      .handleSearchInputChange({ target: { value: 'some-value' } });

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({
      pathname: DEFAULT_PATHNAME,
      search: '?repositoryNameSearch=some-value&userLogin=userLogin',
    });
  });

  it('should useUrlQuerySpy get url params from string', () => {
    expect(useUrlQuerySpy().get('userLogin')).toEqual('userLogin');
  });

  it('should useUrlQuerySpy toBeInstanceOf URLSearchParams class', () => {
    expect(useUrlQuerySpy()).toBeInstanceOf(URLSearchParams);
  });

  it('should useUrlQuerySpy be called on mount', () => {
    expect(useUrlQuerySpy).toHaveBeenCalled();
  });

  it('should push url with new parameters based search input value', () => {
    jest.clearAllMocks();
    shallowRenderedComponent
      .find('RepositoriesSearchInput')
      .props()
      .handleSearchInputChange({ target: { value: undefined } });

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({
      pathname: DEFAULT_PATHNAME,
      search: '?userLogin=userLogin',
    });
  });

  it('should fetch new repositories list on change page event', () => {
    shallowRenderedComponent
      .find('RepositoryTable')
      .props()
      .handleChangePage({ target: { value: undefined } }, 2);

    expect(propsMock.getRepositories).toHaveBeenCalled();
    expect(propsMock.getRepositories).toHaveBeenCalledWith({
      variables: { after: 'Y3Vyc29yOjM=', first: 1, queryString: ' user:userLogin sort:stars' },
    });
  });

  it('should not fetch new repositories list on change page event if user reaches last page', () => {
    shallowRenderedComponent
      .find('RepositoryTable')
      .props()
      .handleChangePage({ target: { value: undefined } }, 4);

    expect(propsMock.getRepositories).not.toHaveBeenCalled();
  });

  it('should be undefined value inside select if user login query parameter not matches with users list', () => {
    expect(shallowRenderedComponent.find('UserSearchSelect').props().value).toEqual(undefined);
  });

  it('should be valid value inside select if user login query parameter matches with users list', () => {
    useUrlQuerySpy.mockImplementation((): unknown => new URLSearchParams('?userLogin=asdlei99'));
    expect(shallowRenderedComponent.find('UserSearchSelect').props().value).toEqual(MOCK_REPOSITORIES_DATA[0]);
  });

  it('should fetch new users list on input change event', () => {
    shallowRenderedComponent.find('UserSearchSelect').props().onInputChange('test-user');

    expect(propsMock.getUsers).toHaveBeenCalledTimes(1);
    expect(propsMock.getUsers).toHaveBeenCalledWith({ variables: { name: 'test-user' } });
  });

  it('should fetch new users list on input change event if input not provided - than with query from url', () => {
    shallowRenderedComponent.find('RepositoriesSearchInput').props().debouncedSubmitInputSearch(undefined);

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({
      pathname: DEFAULT_PATHNAME,
      search: '?userLogin=userLogin',
    });
  });

  it('should not fetch new users list user removed value from input', () => {
    shallowRenderedComponent.find('UserSearchSelect').props().onInputChange('');

    expect(propsMock.getUsers).not.toHaveBeenCalled();
  });

  it('should push url with new parameters based on picked value users from select', () => {
    shallowRenderedComponent.find('UserSearchSelect').props().onSelectChange({
      iconSrc: 'https://avatars3.githubusercontent.com/u/5230466?v=4',
      label: 'annlei (asdlei99)',
      value: 'asdlei99',
    });

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({
      pathname: DEFAULT_PATHNAME,
      search: '?userLogin=asdlei99',
    });
  });

  it('should push url to default url if user remove selection', () => {
    shallowRenderedComponent.find('UserSearchSelect').props().onSelectChange(undefined);

    expect(propsMock.history.push).toHaveBeenCalledTimes(1);
    expect(propsMock.history.push).toHaveBeenCalledWith({ pathname: DEFAULT_PATHNAME, search: '' });
  });
});
