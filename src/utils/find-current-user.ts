import { SelectOptions, SelectOption } from './format-users';

export const findCurrentUser = (userOptions: SelectOptions, userLoginParams: string): SelectOption | undefined =>
  userOptions.find((userOption: SelectOption): boolean => userOption.value === userLoginParams);
