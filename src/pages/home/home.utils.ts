import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

interface SearchParams {
  [repositorySearchValue: string]: string | null;
  userLogin: string | null;
  page: string | null;
  rowsPerPage: string | null;
}

export const prepareSearchParams = (params: SearchParams): string => {
  if (isPlainObject(params) && !isEmpty(params)) {
    const result = Object.keys(params).reduce((accumulator, currentValue, index) => {
      const newValue = currentValue || '';
      const paramsValue: string | null = params[newValue];
      if (isNil(currentValue) || isNil(paramsValue) || isEmpty(paramsValue)) {
        return accumulator;
      }

      return `${accumulator}${accumulator.length === 1 ? '' : '&'}${currentValue}=${paramsValue || ''}`;
    }, '?');

    return result.length === 1 ? '' : result;
  }

  return '';
};

interface QueryParams {
  [name: string]: string | null;
  owner: string | null;
}

export const prepareQueryParams = (params: QueryParams): string => {
  if (isPlainObject(params) && !isEmpty(params)) {
    const result = Object.keys(params).reduce((accumulator, currentValue) => {
      const newValue = currentValue || '';
      const paramsValue: string | null = params[newValue];
      if (isNil(currentValue) || isNil(paramsValue) || isEmpty(paramsValue)) {
        return accumulator;
      }

      return `${accumulator}${currentValue}:${paramsValue}`;
    }, '');

    return result;
  }

  return '';
};
