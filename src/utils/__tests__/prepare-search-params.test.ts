import { prepareSearchParams } from '../prepare-search-params';
import { REPOSITORY_NAME_QUERY_PARAMETER, USER_LOGIN_PARAMETER } from '../../constants';

const mockParams = { [REPOSITORY_NAME_QUERY_PARAMETER]: 'eqwe', [USER_LOGIN_PARAMETER]: 'asdlei99' };

describe('prepareSearchParams', () => {
  it('should generate url query search string for provided params', (): void => {
    expect(prepareSearchParams(mockParams)).toEqual('?repositoryNameSearch=eqwe&userLogin=asdlei99');
  });

  it('should return empty query search string if params values are empty', (): void => {
    expect(prepareSearchParams({ [REPOSITORY_NAME_QUERY_PARAMETER]: '', [USER_LOGIN_PARAMETER]: '' })).toEqual('');
  });
});
