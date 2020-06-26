import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { FETCH_REPOSTORIES } from '../../api/queries'
import { RepositoryTable } from '../../components/repository-table'

interface Props {
  
}

export const Home = (props: Props) => {
  const { loading, error, data } = useQuery(FETCH_REPOSTORIES, { variables:{ login: 'gaearon', repositoryItemsCount: 10 } } );
  

  return (
    <div>
      <RepositoryTable />
    </div>
  )
}

