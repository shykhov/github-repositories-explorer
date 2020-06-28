import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

interface SearchParams {
  [repositorySearchValue: string]: string | null;
  userLogin: string | null;
  page: string | null;
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

interface QueryParams {
  [user: string]: string | null;
  ['in:name']: string;
  sort: string;
}

export const prepareQueryParams = (params: QueryParams): string => {
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

  return '';
};
