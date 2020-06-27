import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';

import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { RepositoriesSearchInput } from '../../components/repositories-search-input';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchSelect } from '../../components/user-search-select';

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

  const [getRepositories, repositoriesQuery] = useLazyQuery(FETCH_REPOSTORIES, {
    variables: { queryString: `name:${repositorySearchValue}`, repositoryItemsCount: 10 },
  });

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

    if (currentValue) {
      history.push(`/repositories?repositorySearchValue=${currentValue}`);
      getRepositories({ variables: { queryString: `name:${currentValue}`, repositoryItemsCount: 10 } });
    }
  };

  const debouncedSubmitInputSearch: any = useCallback(debounce(handleSubmitInputSearch, 1500), []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      debouncedSubmitInputSearch(value.trim());
    } else {
      history.push(`/repositories`);
    }

    setRepositorySearchValue(value);
  };

  // const handleSearchInputChange: any = useCallback(
  //   debounce((event: ChangeEvent<HTMLInputElement>) => {
  //     const value = event.persist().target.value.trim();
  //     if (value) {
  //       setRepositorySearchValue(value);
  //     }
  //   }, 500),
  //   [],
  // );

  const handleSearchInputSubmit = (event: any) => {
    const inputValue = event.target.elements[0].value;

    if (inputValue) {
      // history.push(`/repositories`);
    }
  };

  const handleSelectChange = (user: SelectValue) => {
    // if (user) {
    //   history.push(`/repositories?userLogin=${user.value}`);
    // } else {
    //   history.push(`/repositories`);
    // }
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
        value={repositorySearchValue}
        loading={repositoriesQuery.loading}
        handleSearchInputChange={handleSearchInputChange}
        debouncedSubmitInputSearch={debouncedSubmitInputSearch}
      />
      <RepositoryTable />
    </div>
  );
};
