import React, { useState, useCallback, useMemo, ChangeEvent, FC, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps, Redirect, RouteProps } from 'react-router-dom';

import { useUrlQuery, useFormatUser, useFormatRepositories, RepositoryResultData } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { REPOSITORIES_PATHNAME, DEFAULT_PATHNAME, REPOSITORIES_PER_PAGE } from '../../constants';
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

  const userLoginParams = query.get('userLogin');
  const repositorySearchParams = query.get('repositorySearchValue');
  const pageParams = query.get('page');
  const searchUserValue = userSearchValue || userLoginParams;

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES);

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchUserValue, userItemsCount: 100 },
    skip: !searchUserValue,
  });

  const repositoriesData: RepositoryResultData = useFormatRepositories(repositoriesQuery.data);

  const handleChangePage = (event: unknown, newPage: number) => {
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: repositorySearchParams,
        userLogin: userLoginParams,
        page: `${newPage}`,
      }),
    });

    if (newPage * REPOSITORIES_PER_PAGE + REPOSITORIES_PER_PAGE <= repositoriesData.repositoryCount) {
      getRepositories({
        variables: {
          queryString: prepareQueryParams({ name: repositorySearchParams, owner: userLoginParams }),
          after: repositoriesData.pageInfo.endCursor,
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

    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: currentValue,
        userLogin: userLoginParams,
        page: pageParams,
      }),
    });

    if (currentValue) {
      getRepositories({
        variables: {
          queryString: prepareQueryParams({ name: currentValue, owner: userLoginParams }),
        },
      });
    }
  };

  const debouncedSubmitInputSearch: any = useCallback(debounce(handleSubmitInputSearch, 1500), [
    userLoginParams,
    pageParams,
    repositorySearchParams,
  ]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      history.push({
        pathname: REPOSITORIES_PATHNAME,
        search: prepareSearchParams({
          userLogin: userLoginParams,
          page: '0',
        }),
      });

      debouncedSubmitInputSearch(value.trim());
    } else {
      history.push({
        pathname: REPOSITORIES_PATHNAME,
        search: prepareSearchParams({
          userLogin: userLoginParams,
          page: '0',
        }),
      });
      debouncedSubmitInputSearch.cancel();
    }

    setRepositorySearchValue(value);
  };

  const handleSelectChange = (user: SelectValue) => {
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: repositorySearchParams,
        userLogin: user ? user.value : '',
        page: '0',
      }),
    });
  };

  const userOptions = useFormatUser(usersQuery.data);

  useEffect(() => {
    if (repositorySearchParams || userLoginParams) {
      getRepositories({
        variables: {
          queryString: prepareQueryParams({ name: repositorySearchParams, owner: userLoginParams }),
        },
      });
    }
  }, [getRepositories, userLoginParams, repositorySearchParams]);

  const userValue = useMemo(
    (): any => userOptions.find((userOption: any): any => userOption.value === userLoginParams),
    [userOptions, userLoginParams],
  );

  return (
    <ContentRenderer
      hasError={!pageParams}
      errorComponent={<Redirect to={DEFAULT_PATHNAME} />}
      contentComponent={
        <>
          <UserSearchSelect
            options={userOptions}
            loading={usersQuery.loading}
            onSelectChange={handleSelectChange}
            onInputChange={handleSelectInputChange}
            value={userValue}
          />
          <RepositoriesSearchInput
            value={repositorySearchValue || repositorySearchParams}
            loading={repositoriesQuery.loading}
            handleSearchInputChange={handleSearchInputChange}
            debouncedSubmitInputSearch={debouncedSubmitInputSearch}
          />
          <RepositoryTable
            loading={repositoriesQuery.loading}
            repositoriesData={repositoriesData}
            page={+pageParams}
            handleChangePage={handleChangePage}
          />
        </>
      }
    />
  );
};
