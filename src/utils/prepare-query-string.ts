import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { REPOSITORY_NAME_QUERY_KEY } from '../constants';

interface QueryParams {
  [user: string]: string | null;
  [REPOSITORY_NAME_QUERY_KEY]: string;
  sort: string;
}

export const prepareQueryString = (params: QueryParams): string | undefined => {
  if (isPlainObject(params) && !isEmpty(params)) {
    const objectKeys = Object.keys(params);
    const result = objectKeys.reduce((accumulator, currentValue) => {
      const newValue = currentValue || '';
      const paramsValue: string | null = params[newValue];
      if (isNil(currentValue) || isNil(paramsValue) || isEmpty(paramsValue)) {
        return accumulator;
      }

      const isComplexQuery = currentValue.includes(':');

      return `${accumulator}${objectKeys.length === 1 ? '' : ' '}${currentValue}${isComplexQuery ? '' : ':'}${
        isComplexQuery ? ' ' : ''
      }${paramsValue}`;
    }, '');

    return result;
  }

  return undefined;
};
