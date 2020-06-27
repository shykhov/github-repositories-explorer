import React, { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps, Redirect, RouteProps } from 'react-router-dom';

import { useUrlQuery, useFormatUser, useFormatRepositories } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { REPOSITORIES_PATHNAME, DEFAULT_PATHNAME } from '../../constants';
import { ContentRenderer } from '../../components/content-renderer';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';
import { prepareSearchParams } from './home.utils';

type Props = RouteComponentProps;

interface UserOptions {
  node: {
    login: string;
    name: string;
    avatarUrl: string;
  };
}

interface RepositoryOption {
  node: {
    stargazers: {
      totalCount: number;
    };
    name: string;
    forks: {
      totalCount: number;
    };
  };
}

export interface SelectValue {
  value: string;
  label: string;
}

export interface SelectOption {
  value: string;
  label: string;
  iconSrc: string;
}

export const Home: React.SFC<Props> = ({ history }) => {
  const query = useUrlQuery();
  const [userSearchValue, setUserSearchValue] = useState('');
  const [repositorySearchValue, setRepositorySearchValue] = useState('');

  const userLoginParams = query.get('userLogin');
  const repositorySearchParams = query.get('repositorySearchValue');
  const pageParams = query.get('page');
  const rowsPerPageParams = query.get('rowsPerPage');
  const searchUserValue = userSearchValue || userLoginParams;

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES, {
    variables: { queryString: `name:${repositorySearchValue}`, repositoryItemsCount: 10 },
  });

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchUserValue, userItemsCount: 100 },
    skip: !searchUserValue,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: repositorySearchParams,
        userLogin: userLoginParams,
        page: `${newPage}`,
        rowsPerPage: rowsPerPageParams,
      }),
    });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    history.push({
      pathname: REPOSITORIES_PATHNAME,
      search: prepareSearchParams({
        repositorySearchValue: repositorySearchParams,
        userLogin: userLoginParams,
        page: '0',
        rowsPerPage: `${event.target.value}`,
      }),
    });
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
        rowsPerPage: rowsPerPageParams,
      }),
    });

    if (currentValue) {
      getRepositories({ variables: { queryString: `name:${currentValue}`, repositoryItemsCount: 10 } });
    }
  };

  const debouncedSubmitInputSearch: any = useCallback(debounce(handleSubmitInputSearch, 1500), [
    userLoginParams,
    pageParams,
    rowsPerPageParams,
    repositorySearchParams,
  ]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      debouncedSubmitInputSearch(value.trim());
    } else {
      history.push({
        pathname: REPOSITORIES_PATHNAME,
        search: prepareSearchParams({
          userLogin: userLoginParams,
          page: pageParams,
          rowsPerPage: rowsPerPageParams,
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
        page: pageParams,
        rowsPerPage: rowsPerPageParams,
      }),
    });
  };

  useEffect(() => {
    if (repositorySearchParams || userLoginParams) {
      getRepositories({ variables: { queryString: `name:${repositorySearchParams}`, repositoryItemsCount: 10 } });
    }
  }, [getRepositories]);

  const repositories = useFormatRepositories(repositoriesQuery.data);

  const userOptions = useFormatUser(usersQuery.data);

  const userValue = useMemo(
    (): any => userOptions.find((userOption: any): any => userOption.value === userLoginParams),
    [userOptions, userLoginParams],
  );

  return (
    <ContentRenderer
      hasError={!(rowsPerPageParams && pageParams)}
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
            repositories={repositories}
            rowsPerPage={+rowsPerPageParams}
            page={+pageParams}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </>
      }
    />
  );
};
