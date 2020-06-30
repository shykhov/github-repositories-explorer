/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createBrowserHistory, createLocation } from 'history';
import { MockedProvider } from '@apollo/react-testing';
import { match as routerMatch } from 'react-router';

import { FETCH_REPOSTORIES, FETCH_USERS } from '../../../api/queries';
import { Home } from '../home';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

const mocks = [
  {
    request: {
      query: FETCH_REPOSTORIES,
      variables: {
        queryString: 'in:name react',
        first: 50,
      },
    },
    result: {
      data: {
        search: {
          repositoryCount: 3,
          pageInfo: {
            endCursor: 'Y3Vyc29yOjM=',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'Y3Vyc29yOjE=',
          },
          edges: [
            {
              node: {
                id: 'MDEwOlJlcG9zaXRvcnkxMTc2ODgyMTY=',
                nameWithOwner: 'ASDQWEA1/ASDQWEA1',
                stargazers: { totalCount: 0 },
                forks: { totalCount: 0 },
                url: 'https://github.com/ASDQWEA1/ASDQWEA1',
              },
            },
            {
              node: {
                id: 'MDEwOlJlcG9zaXRvcnkxNjQ1MTA5MDg=',
                nameWithOwner: 'JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
                stargazers: { totalCount: 0 },
                forks: { totalCount: 0 },
                url: 'https://github.com/JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
              },
            },
            {
              node: {
                id: 'MDEwOlJlcG9zaXRvcnkxNDg0NTcyNzQ=',
                nameWithOwner: 'SLCDevelopment/asdqweasdqweaaa',
                stargazers: { totalCount: 0 },
                forks: { totalCount: 0 },
                url: 'https://github.com/SLCDevelopment/asdqweasdqweaaa',
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      skip: false,
      query: FETCH_USERS,
      variables: {
        query: 'gaeron',
      },
    },
    result: {
      data: {
        search: {
          edges: [
            {
              node: {
                id: 'MDQ6VXNlcjUyMzA0NjY=',
                login: 'asdlei99',
                name: 'annlei',
                avatarUrl: 'https://avatars3.githubusercontent.com/u/5230466?v=4',
              },
            },
            {
              node: {
                id: 'MDQ6VXNlcjMzNjU1MTA=',
                login: 'asdlei00',
                name: 'asdlei',
                avatarUrl: 'https://avatars1.githubusercontent.com/u/3365510?v=4',
              },
            },
          ],
        },
      },
    },
  },
];

const history = createBrowserHistory();
const path = `/route/:id`;

const match: routerMatch<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: '1' },
};

const location = createLocation(match.url);

describe('<Home />', () => {
  let renderedComponent: ShallowWrapper;
  const propsMock = { history, match, location };

  beforeEach(() => {
    renderedComponent = shallow(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Home {...propsMock} />
      </MockedProvider>,
    );
  });

  it('should render Home', () => {
    expect(renderedComponent.dive().dive().dive()).toMatchSnapshot();
  });
});
