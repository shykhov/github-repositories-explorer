import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { USER_LOGIN_PARAMETER } from '../constants';

interface SearchParams {
  [repositoryNameSearch: string]: string | null;
  [USER_LOGIN_PARAMETER]: string | null;
}

export const prepareSearchParams = (params: SearchParams): string => {
  if (isPlainObject(params) && !isEmpty(params)) {
    const result = Object.keys(params).reduce((accumulator, currentValue) => {
      const newValue = currentValue || '';
      const paramsValue: string | null = params[newValue];
      if (isNil(currentValue) || isNil(paramsValue) || isEmpty(paramsValue)) {
        return accumulator;
      }

      return `${accumulator}${accumulator.length === 1 ? '' : '&'}${currentValue}=${paramsValue}`;
    }, '?');

    return result.length === 1 ? '' : result;
  }

  return '';
};
