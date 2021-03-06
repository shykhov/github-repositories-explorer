import { formatRepositories } from '../format-repositories';
import { MOCK_REPOSITORIES_DATA } from '../../constants';

const formattedRepositories = {
  repositoryCount: 3,
  pageInfo: {
    endCursor: 'Y3Vyc29yOjM=',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'Y3Vyc29yOjE=',
  },
  elements: [
    {
      stars: 0,
      nameWithOwner: 'ASDQWEA1/ASDQWEA1',
      forks: 0,
      url: 'https://github.com/ASDQWEA1/ASDQWEA1',
      id: 'MDEwOlJlcG9zaXRvcnkxMTc2ODgyMTY=',
    },
    {
      stars: 0,
      nameWithOwner: 'JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
      forks: 0,
      url: 'https://github.com/JFHWYFHEDY9FR7923RYBHFKDSCF/asdqweasdwaeasd',
      id: 'MDEwOlJlcG9zaXRvcnkxNjQ1MTA5MDg=',
    },
    {
      stars: 0,
      nameWithOwner: 'SLCDevelopment/asdqweasdqweaaa',
      forks: 0,
      url: 'https://github.com/SLCDevelopment/asdqweasdqweaaa',
      id: 'MDEwOlJlcG9zaXRvcnkxNDg0NTcyNzQ=',
    },
  ],
};

describe('formatRepositories', () => {
  it('should format grapql raw data', (): void => {
    expect(formatRepositories(MOCK_REPOSITORIES_DATA)).toEqual(formattedRepositories);
  });
});
