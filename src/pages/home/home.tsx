import React, { useState, useCallback, useMemo, ChangeEvent, FC, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps, Redirect, RouteProps } from 'react-router-dom';

import { Root, ControlsWrapper } from './home.styled';
import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { REPOSITORIES_PATHNAME, DEFAULT_PATHNAME, REPOSITORIES_PER_PAGE } from '../../constants';
import { generateCursor, formatRepositories, formatUsers, findCurrentUser } from '../../utils';
import { ContentRenderer } from '../../components/content-renderer';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';
import { prepareSearchParams, prepareQueryParams } from './home.utils';

type Props = RouteComponentProps;

export interface SelectValue {
  value: string;
  label: string;
}

export interface RepositoriesVariables {
  queryString: string;
  repositoryItemsCount: number;
  after?: string;
}

export const Home: FC<Props> = ({ history }) => {
  const query = useUrlQuery();
  const [userSearchValue, setUserSearchValue] = useState('');
  const [repositorySearchValue, setRepositorySearchValue] = useState('');
  const [page, setPage] = useState(0);

  const userLoginParams = query.get('userLogin');
  const repositorySearchParams = query.get('repositorySearchValue');

  const searchUserValue = userSearchValue || userLoginParams;

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES);

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchUserValue, userItemsCount: 100 },
    skip: !searchUserValue,
  });

  const userOptions = useMemo(() => formatUsers(usersQuery.data), [usersQuery.data]);

  const currentUser = useMemo(() => findCurrentUser(userOptions, userLoginParams), [userOptions, userLoginParams]);

  const repositoriesData = useMemo(() => formatRepositories(repositoriesQuery.data), [repositoriesQuery.data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    const {
      repositoryCount,
      pageInfo: { endCursor, startCursor },
    } = repositoriesData;

    if (newPage * REPOSITORIES_PER_PAGE + REPOSITORIES_PER_PAGE <= repositoryCount) {
      getRepositories({
        variables: {
          queryString: prepareQueryParams({ 'in:name': repositorySearchParams, user: userLoginParams, sort: 'stars' }),
          [newPage > page ? 'first' : 'last']: REPOSITORIES_PER_PAGE,
          ...generateCursor({ newPage, oldPage: page, endCursor, startCursor }),
        },
      });
    }
  };

  const handleSelectInputChange: any = useCallback(
    debounce((value: string) => {
      if (value) {
        setUserSearchValue(value);
      }
    }, 500),
    [],
  );

  const handleSubmitInputSearch: any = (value: string) => {
    const currentValue = value || repositorySearchValue;
    setPage(0);

    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: currentValue,
        userLogin: userLoginParams,
      }),
    });
  };

  const debouncedSubmitInputSearch: any = useCallback(debounce(handleSubmitInputSearch, 1500), [
    userLoginParams,
    repositorySearchParams,
  ]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      debouncedSubmitInputSearch(value.trim());
    } else {
      debouncedSubmitInputSearch.cancel();

      history.push({
        pathname: REPOSITORIES_PATHNAME,
        search: prepareSearchParams({
          userLogin: userLoginParams,
        }),
      });
    }

    setRepositorySearchValue(value);
  };

  const handleSelectChange = (user: SelectValue) => {
    setPage(0);
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: repositorySearchParams,
        userLogin: user ? user.value : '',
      }),
    });
  };

  useEffect(() => {
    if (repositorySearchParams || userLoginParams) {
      getRepositories({
        variables: {
          first: REPOSITORIES_PER_PAGE,
          queryString: prepareQueryParams({ 'in:name': repositorySearchParams, user: userLoginParams, sort: 'stars' }),
        },
      });
    }
  }, [getRepositories, userLoginParams, repositorySearchParams]);

  return (
    <ContentRenderer
      hasError={false}
      errorComponent={<Redirect to={DEFAULT_PATHNAME} />}
      contentComponent={
        <Root>
          <RepositoryTable
            loading={repositoriesQuery.loading}
            repositoriesData={repositoriesData}
            page={page}
            handleChangePage={handleChangePage}
          />
          <ControlsWrapper>
            <RepositoriesSearchInput
              value={repositorySearchValue || repositorySearchParams}
              loading={repositoriesQuery.loading}
              handleSearchInputChange={handleSearchInputChange}
              debouncedSubmitInputSearch={debouncedSubmitInputSearch}
            />
            <UserSearchSelect
              options={userOptions}
              loading={usersQuery.loading}
              onSelectChange={handleSelectChange}
              onInputChange={handleSelectInputChange}
              value={currentUser}
            />
          </ControlsWrapper>
        </Root>
      }
    />
  );
};
