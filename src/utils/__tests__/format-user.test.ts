import { formatUsers } from '../format-users';
import { MOCK_USERS_DATA } from '../../constants';

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
    expect(formatUsers(MOCK_USERS_DATA)).toEqual(formattedUsersOptions);
  });

  it('should format grapql raw data', (): void => {
    expect(formatUsers({ search: { edges: [] } })).toEqual([]);
  });
});
