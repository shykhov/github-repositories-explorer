import React from 'react';
import { mount } from 'enzyme';

import { useUrlQuery, URLSearchParams } from '../use-url-query';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '?repositoryNameSearch=eqwe&userLogin=asdlei99',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

type HookProps = {
  callback(): void;
};

const TestHook = ({ callback }: HookProps) => {
  callback();
  return null;
};

export const testHook = (callback: () => void): void => {
  mount(<TestHook callback={callback} />);
};

let query: URLSearchParams;
beforeEach(() => {
  testHook(() => {
    query = useUrlQuery();
  });
});

describe('useUrlQuery', () => {
  it('should have a get function that return query parameter by name', () => {
    expect(query.get('repositoryNameSearch')).toEqual('eqwe');
    expect(query.get('userLogin')).toEqual('asdlei99');
  });
});
