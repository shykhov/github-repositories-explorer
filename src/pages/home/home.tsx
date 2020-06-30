import React, { useState, useCallback, useMemo, ChangeEvent, FC, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';

import { Root, ControlsWrapper } from './home.styled';
import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import {
  REPOSITORIES_PATHNAME,
  REPOSITORIES_PER_PAGE,
  DEFAULT_DEBOUNCE_TIMEOUT,
  USER_LOGIN_PARAMETER,
  REPOSITORY_NAME_PARAMETER,
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
} from '../../utils';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';

export interface SelectValue {
  value: string;
  label: string;
}

export interface RepositoriesVariables {
  queryString: string;
  repositoryItemsCount: number;
  after?: string;
}

export const Home: FC<RouteComponentProps> = ({ history }) => {
  const query = useUrlQuery();
  const [userLoginSearchValue, setUserLoginSearchValue] = useState('');
  const [repositoryNameSearchValue, setRepositoryNameSearchValue] = useState('');
  const [page, setPage] = useState(0);

  const userLoginParameter = query.get(USER_LOGIN_PARAMETER);
  const repositoryNameSearchParameter = query.get(REPOSITORY_NAME_PARAMETER);

  const searchUserValue = userLoginSearchValue || userLoginParameter;

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES);

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchUserValue },
    skip: !searchUserValue,
  });

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

  const handleUserSelectInputChange = (userLogin: string | undefined) => {
    if (userLogin) {
      setUserLoginSearchValue(userLogin);
    }
  };

  const debouncedHandleUserSelectInputChange = useCallback(
    debounce(handleUserSelectInputChange, DEFAULT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handleSubmitInputSearch = (repositoryName: string): void => {
    setPage(0);

    const currentRepositoryName = repositoryName || repositoryNameSearchValue;

    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        [REPOSITORY_NAME_PARAMETER]: currentRepositoryName,
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

  const handleSelectChange = (user: SelectValue) => {
    setPage(0);
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        [REPOSITORY_NAME_PARAMETER]: repositoryNameSearchParameter,
        [USER_LOGIN_PARAMETER]: user ? user.value : '',
      }),
    });
  };

  useEffect(() => {
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
          loading={usersQuery.loading}
          onSelectChange={handleSelectChange}
          onInputChange={debouncedHandleUserSelectInputChange}
          value={currentUser}
        />
      </ControlsWrapper>
    </Root>
  );
};
