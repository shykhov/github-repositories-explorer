import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

interface Params {
  [repositorySearchValue: string]: string;
  userLogin: string;
  page: string;
  rowsPerPage: string;
}

export const prepareSearchParams = (params: Params): string => {
  if (isPlainObject(params) && !isEmpty(params)) {
    const result = Object.keys(params).reduce((accumulator, currentValue, index) => {
      const newValue = currentValue || '';
      const paramsValue: string | null = params[newValue];
      if (isNil(currentValue) || isNil(paramsValue)) {
        return accumulator;
      }

      return `${accumulator}${index === 0 ? '' : '&'}${currentValue}=${paramsValue || ''}`;
    }, '?');

    return result.length === 1 ? '' : result;
  }

  return '';
};
