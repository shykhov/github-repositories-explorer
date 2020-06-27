import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';

import { useUrlQuery } from '../../hooks';
import { FETCH_REPOSTORIES, FETCH_USERS } from '../../api/queries';
import { RepositoryTable } from '../../components/repository-table';
import { UserSearchBar } from '../../components/user-search-bar';

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
  const userLogin = query.get('userLogin');
  const page = query.get('page');
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange: any = useCallback(
    debounce((value: string) => {
      if (value) {
        setSearchValue(value);
      }
    }, 500),
    [],
  );

  const handleSelectChange = (user: SelectValue) => {
    if (user) {
      history.push(`/repositories?userLogin=${user.value}`);
    } else {
      history.push(`/repositories`);
    }
  };

  const repositoriesQuery = useQuery(FETCH_REPOSTORIES, {
    variables: { login: 'gaearon', repositoryItemsCount: 10 },
  });

  const usersQuery = useQuery(FETCH_USERS, {
    variables: { name: searchValue || userLogin, userItemsCount: 100 },
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

  const userValue = useMemo((): any => userOptions.find((userOption: any): any => userOption.value === userLogin), [
    userOptions,
    userLogin,
  ]);

  return (
    <div>
      <UserSearchBar
        refetch={() => {}}
        options={formatUserData(usersQuery.data)}
        loading={usersQuery.loading}
        onSelectChange={handleSelectChange}
        onInputChange={handleInputChange}
        value={userValue}
      />
      <RepositoryTable />
    </div>
  );
};
