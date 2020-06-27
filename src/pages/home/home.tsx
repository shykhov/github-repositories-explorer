import React, { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';

import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';
import { REPOSITORIES_PATHNAME } from '../../constants';
import { prepareSearchParams } from './home.utils';

type Props = RouteComponentProps;

interface UserOptions {
  node: {
    login: string;
    name: string;
    avatarUrl: string;
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

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES, {
    variables: { queryString: `name:${repositorySearchValue}`, repositoryItemsCount: 10 },
  });

  const handleChangePage = (event: unknown, newPage: number) => {};

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    if (repositorySearchParams || userLoginParams) {
      getRepositories({ variables: { queryString: `name:${repositorySearchParams}`, repositoryItemsCount: 10 } });
    }
  }, [getRepositories]);

  const searchUserValue = userSearchValue || userLoginParams;

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

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchUserValue, userItemsCount: 100 },
    skip: !searchUserValue,
  });

  const formatUserData = useCallback(
    options => {
      if (options && options.search && options.search.edges) {
        return options.search.edges.map(
          ({ node: { login, name, avatarUrl } }: UserOptions): SelectOption => ({
            iconSrc: avatarUrl,
            label: name ? `${name} (${login})` : login,
            value: login,
          }),
        );
      }
      return [];
    },
    [usersQuery.data],
  );

  const userOptions: Array<any> = formatUserData(usersQuery.data);

  const userValue = useMemo(
    (): any => userOptions.find((userOption: any): any => userOption.value === userLoginParams),
    [userOptions, userLoginParams],
  );

  return (
    <div>
      <UserSearchSelect
        refetch={() => {}}
        options={formatUserData(usersQuery.data)}
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
      <RepositoryTable />
    </div>
  );
};
