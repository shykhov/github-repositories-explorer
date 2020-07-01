import React, { useCallback, useMemo, ChangeEvent, FC } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import debounce from 'lodash/debounce';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import { Root, ControlsWrapper } from './home.styled';
import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import {
  REPOSITORIES_PATHNAME,
  REPOSITORIES_PER_PAGE,
  DEFAULT_DEBOUNCE_TIMEOUT,
  USER_LOGIN_PARAMETER,
  REPOSITORY_NAME_QUERY_PARAMETER,
  REPOSITORY_NAME_QUERY_KEY,
  DEFAULT_REPOSITORY_SORT_QUERY,
  PAGINATION_DIRECTION,
} from '../../constants';
import {
  generateCursor,
  formatRepositories,
  formatUsers,
  findCurrentUser,
  prepareQueryString,
  prepareSearchParams,
  RepositoryOptions,
  UserOptions,
  SelectOption,
} from '../../utils';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';

export type ApolloLazyQueryResult<T> = {
  data: T;
  called: boolean;
  error?: ApolloError | undefined;
  loading: boolean;
};

export interface HomeProps {
  getRepositories(variables: Record<string, unknown>): void;
  repositoriesQuery: ApolloLazyQueryResult<RepositoryOptions>;
  usersQuery: ApolloLazyQueryResult<UserOptions>;
  getUsers(variables: Record<string, unknown>): void;
  history: History;
}

export const Home: FC<HomeProps> = props => {
  const { getRepositories, repositoriesQuery, usersQuery, getUsers, history } = props;
  const query = useUrlQuery();
  const [userLoginSearchValue, setUserLoginSearchValue] = React.useState('');
  const [repositoryNameSearchValue, setRepositoryNameSearchValue] = React.useState('');
  const [page, setPage] = React.useState(0);

  const userLoginParameter = query.get(USER_LOGIN_PARAMETER);
  const repositoryNameSearchParameter = query.get(REPOSITORY_NAME_QUERY_PARAMETER);

  const userOptions = useMemo(() => formatUsers(usersQuery.data), [usersQuery.data]);

  const currentUser = useMemo(() => findCurrentUser(userOptions, userLoginParameter), [
    userOptions,
    userLoginParameter,
  ]);

  const repositoriesData = useMemo(() => formatRepositories(repositoriesQuery.data), [repositoriesQuery.data]);

  const handleChangePage = (event: ChangeEvent, newPage: number) => {
    const {
      repositoryCount,
      pageInfo: { endCursor, startCursor },
    } = repositoriesData;

    const { first, last } = PAGINATION_DIRECTION;

    if (newPage * REPOSITORIES_PER_PAGE + REPOSITORIES_PER_PAGE <= repositoryCount) {
      getRepositories({
        variables: {
          queryString: prepareQueryString({
            [REPOSITORY_NAME_QUERY_KEY]: repositoryNameSearchParameter,
            user: userLoginParameter,
            ...DEFAULT_REPOSITORY_SORT_QUERY,
          }),
          [newPage > page || newPage === 0 ? first : last]: REPOSITORIES_PER_PAGE,
          ...generateCursor({ newPage, oldPage: page, endCursor, startCursor }),
        },
      });
    }

    setPage(newPage);
  };

  const getNewUsers = (userLogin: string) => {
    getUsers({
      variables: {
        name: userLogin,
      },
    });
  };

  const debouncedHandleUserSelectInputChange = useCallback(debounce(getNewUsers, DEFAULT_DEBOUNCE_TIMEOUT), []);

  const handleUserSelectInputChange = (userLogin: string) => {
    if (userLogin) {
      setUserLoginSearchValue(userLogin);
      debouncedHandleUserSelectInputChange(userLogin);
    }
  };

  const handleSubmitInputSearch = (repositoryName: string): void => {
    setPage(0);

    const currentRepositoryName: string = repositoryName || repositoryNameSearchValue;

    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        [REPOSITORY_NAME_QUERY_PARAMETER]: currentRepositoryName,
        [USER_LOGIN_PARAMETER]: userLoginParameter,
      }),
    });
  };

  const debouncedSubmitInputSearch = useCallback(debounce(handleSubmitInputSearch, DEFAULT_DEBOUNCE_TIMEOUT), [
    userLoginParameter,
    repositoryNameSearchParameter,
  ]);

  const handleSearchRepositoryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      debouncedSubmitInputSearch(value.trim());
    } else {
      debouncedSubmitInputSearch.cancel();

      history.push({
        pathname: REPOSITORIES_PATHNAME,
        search: prepareSearchParams({
          [USER_LOGIN_PARAMETER]: userLoginParameter,
        }),
      });
    }

    setRepositoryNameSearchValue(value);
  };

  const handleSelectChange = (user: SelectOption) => {
    setPage(0);
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        [REPOSITORY_NAME_QUERY_PARAMETER]: repositoryNameSearchParameter,
        [USER_LOGIN_PARAMETER]: user ? user.value : '',
      }),
    });
  };

  React.useEffect(() => {
    if (repositoryNameSearchParameter || userLoginParameter) {
      getRepositories({
        variables: {
          first: REPOSITORIES_PER_PAGE,
          queryString: prepareQueryString({
            [REPOSITORY_NAME_QUERY_KEY]: repositoryNameSearchParameter,
            user: userLoginParameter,
            ...DEFAULT_REPOSITORY_SORT_QUERY,
          }),
        },
      });
    }
  }, [getRepositories, userLoginParameter, repositoryNameSearchParameter]);

  return (
    <Root>
      <RepositoryTable
        error={Boolean(repositoriesQuery.error)}
        loading={repositoriesQuery.loading}
        called={repositoriesQuery.called}
        repositoriesData={repositoriesData}
        page={page}
        handleChangePage={handleChangePage}
      />
      <ControlsWrapper>
        <RepositoriesSearchInput
          value={repositoryNameSearchValue || repositoryNameSearchParameter}
          loading={repositoriesQuery.loading}
          handleSearchInputChange={handleSearchRepositoryInputChange}
          debouncedSubmitInputSearch={debouncedSubmitInputSearch}
        />
        <UserSearchSelect
          options={userOptions}
          inputValue={userLoginSearchValue}
          loading={usersQuery.loading}
          onSelectChange={handleSelectChange}
          onInputChange={handleUserSelectInputChange}
          value={currentUser}
        />
      </ControlsWrapper>
    </Root>
  );
};

export const HomeContainer: FC<RouteComponentProps> = ({ history }) => {
  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES);
  const [getUsers, usersQuery] = useLazyQuery(FETCH_USERS);

  return (
    <Home
      history={history}
      usersQuery={usersQuery}
      getUsers={getUsers}
      repositoriesQuery={repositoriesQuery}
      getRepositories={getRepositories}
    />
  );
};
