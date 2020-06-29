import { findCurrentUser } from '../find-current-user';

const usersMockOptions = [
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

describe('findCurrentUser', () => {
  it('should find user from options by login', (): void => {
    expect(findCurrentUser(usersMockOptions, 'asdlei99')).toEqual(usersMockOptions[0]);
  });
});
