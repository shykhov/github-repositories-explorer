import { formatUsers } from '../format-users';

const usersMockData = {
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
};

const formattedUsersOptions = [
  {
    iconSrc: 'https://avatars3.githubusercontent.com/u/5230466?v=4',
    label: 'annlei (asdlei99)',
    value: 'asdlei99',
  },
  {
    iconSrc: 'https://avatars1.githubusercontent.com/u/3365510?v=4',
    label: 'asdlei (asdlei00)',
    value: 'asdlei00',
  },
];

describe('formatUsers', () => {
  it('should format grapql raw data', (): void => {
    expect(formatUsers(usersMockData)).toEqual(formattedUsersOptions);
  });
});
