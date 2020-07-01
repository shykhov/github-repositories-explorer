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
  it('should return user from options by login', () => {
    expect(findCurrentUser(usersMockOptions, 'asdlei99')).toEqual(usersMockOptions[0]);
  });

  it('should return undefined if there is no such login', () => {
    expect(findCurrentUser(usersMockOptions, 'some-login')).toEqual(undefined);
  });
});
