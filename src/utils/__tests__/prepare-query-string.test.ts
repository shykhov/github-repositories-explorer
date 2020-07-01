import { prepareQueryString } from '../prepare-query-string';
import { REPOSITORY_NAME_QUERY_KEY } from '../../constants';

const mockParams = { [REPOSITORY_NAME_QUERY_KEY]: 'react', user: 'some-user', sort: 'stars' };

describe('prepareQueryString', () => {
  it('should generate query string for provided params', (): void => {
    expect(prepareQueryString(mockParams)).toEqual(' in:name react user:some-user sort:stars');
  });

  it('should return empty string if params values are empty', (): void => {
    expect(prepareQueryString({ [REPOSITORY_NAME_QUERY_KEY]: null, user: null })).toEqual('');
  });
});
