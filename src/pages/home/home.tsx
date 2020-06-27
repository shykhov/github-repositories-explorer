import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { FETCH_REPOSTORIES } from '../../api/queries';
import { RepositoryTable } from '../../components/repository-table';

export const Home: React.SFC<RouteComponentProps> = () => {
  const { loading, error, data } = useQuery(FETCH_REPOSTORIES, {
    variables: { login: 'gaearon', repositoryItemsCount: 10 },
  });

  return (
    <div>
      <RepositoryTable />
    </div>
  );
};
